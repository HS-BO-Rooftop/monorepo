import {
  FluxResultObserver,
  FluxTableMetaData,
  InfluxDB,
  ParameterizedQuery,
  Point,
  QueryOptions
} from '@influxdata/influxdb-client';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ShutdownService } from '../shutdown/shutdown.service';

export type QueryRow<T> = {
  [_field in keyof T]: {
    _time: Date;
    _value: T[_field];
  };
};

export type QueryData<T> = {
  [_field in keyof T]: {
    _time: Date;
    _value: T[_field] | null;
  }[];
};

@Injectable()
export class InfluxDbService {
  private readonly logger = new Logger(InfluxDbService.name);
  public readonly influx: InfluxDB;

  constructor(
    private readonly config: ConfigService,
    private readonly shutdown: ShutdownService
  ) {
    const influxUrl = this.config.get('INFLUX_URL');
    if (!influxUrl) {
      this.logger.error('No INFLUX_URL set');
      this.shutdown.shutdown();
    }

    const influxToken = this.config.get('INFLUX_TOKEN');
    if (!influxToken) {
      this.logger.error('No INFLUX_TOKEN set');
      this.shutdown.shutdown();
    }

    this.influx = new InfluxDB({
      url: influxUrl,
      token: influxToken,
    });
  }

  public query<RowType>(
    org: string,
    query: string | ParameterizedQuery
  ): Promise<QueryData<RowType>>;
  public query<RowType>(
    org: string,
    query: string | ParameterizedQuery,
    mapperFunction: (row: string[], tableMeta: FluxTableMetaData) => RowType
  ): Promise<QueryData<RowType>>;
  public query<RowType>(
    options: QueryOptions,
    query: string
  ): Promise<QueryData<RowType>>;
  public query<RowType>(
    org: string | QueryOptions,
    query: string | ParameterizedQuery
  ): Promise<QueryData<RowType>> {
    return new Promise((resolve, reject) => {
      const data: QueryData<RowType> = {} as QueryData<RowType>;
      const observer: FluxResultObserver<string[]> = {
        next: (row: string[], tableMeta: FluxTableMetaData) => {
          const field = tableMeta.get(row, '_field');
          const value = tableMeta.get(row, '_value');
          const time = tableMeta.get(row, '_time');
          const date = new Date(time);

          if (!data[field]) data[field] = [];
          data[field].push({
            _time: date,
            _value: value,
          });
        },
        error: (error) => {
          reject(error);
        },
        complete: () => {
          resolve(data);
        },
      };

      this.influx.getQueryApi(org).queryRows(query, observer);
    });
  }

  public async write(org: string, bucket: string, ...data: Point[]) {
    const writeApi = this.influx.getWriteApi(org, bucket);
    try {
      writeApi.writePoints(data);
      await writeApi.close();
    } catch (error) {
      this.logger.error('Error writing to influx', error);
      throw error;
    }
  }
}
