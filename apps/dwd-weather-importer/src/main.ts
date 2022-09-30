import { InfluxDB, Point } from '@influxdata/influxdb-client';
// import { DeleteAPI } from '@influxdata/influxdb-client-apis';
import axios from 'axios';
import { WeatherResponseDto } from './app/dto/weather-response.dto';

// Bochum LAT/LON
const LAT = 51.48;
const LON = 7.21;
const ENDPOINT = 'https://api.brightsky.dev';

const INFLUX_TOKEN = 'TOKEN GOES HERE';
const INFLUX_ORG = 'ontop.hs-bochum.de';
const INFLUX_URL = 'http://192.168.2.1:8086';

// January 1st 2010 (BrightSky API only has data from 2010)
const FROM = new Date('2010-01-01T00:00:00.000Z');

// 28.09.2022 12:00:00 UTC
const TO = new Date('2022-09-28T12:00:00.000Z');

async function getHistoricWeather() {
  // Setup influxDB connection
  const influx = new InfluxDB({
    url: INFLUX_URL,
    token: INFLUX_TOKEN,
  });
  const writeApi = influx.getWriteApi(INFLUX_ORG, 'initial');

  let date = FROM;
  const last_date = TO;

  // Delete old data
  // const deleteApi = new DeleteAPI(influx);
  // await deleteApi.postDelete({
  //   org: INFLUX_ORG,
  //   bucket: 'initial',
  //   body: {
  //     start: FROM.toISOString(),
  //     stop: TO.toISOString(),
  //     predicate: '_measurement="dwd_current_weather"',
  //   },
  // });

  // Split into 6 month chunks
  while (date < last_date) {
    let next_date = new Date(date);
    next_date.setMonth(date.getMonth() + 6);
    if (next_date > last_date) {
      next_date = last_date;
    }

    const url = `${ENDPOINT}/weather?lat=${LAT}&lon=${LON}&date=${date.toISOString()}&last_date=${next_date.toISOString()}`;
    console.log(`Fetching ${url}`);
    date = next_date;

    try {
      const response = await axios.get<WeatherResponseDto>(url);
      for (const weatherReport of response.data.weather) {
        // Create influxDB point
        const point = new Point('dwd_current_weather')
          .tag('source', 'dwd')
          .timestamp(new Date(weatherReport.timestamp));

        for (const key in weatherReport) {
          if (Object.prototype.hasOwnProperty.call(weatherReport, key)) {
            const element = weatherReport[key];
            if (element === null) {
              continue;
            }
            if (typeof element === 'number') {
              point.floatField(key, element);
            } else if (typeof element === 'string') {
              point.stringField(key, element);
            } else {
              point.stringField(key, JSON.stringify(element));
            }
          }
        }
        // Write point to influxDB
        writeApi.writePoint(point);
      }
      // Flush all points to influxDB
      writeApi.flush();
    } catch (error) {
      console.error(error);
      break;
    }
  }

  writeApi.close();
  console.log('Done');
}

getHistoricWeather();
