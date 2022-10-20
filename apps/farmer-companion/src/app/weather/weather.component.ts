import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChartConfiguration } from 'chart.js';
import { format, subWeeks } from 'date-fns';
import { map, Subject } from 'rxjs';
import { WeatherService } from '../api/services';

@Component({
  selector: 'rooftop-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  weatherData = new Subject<ChartConfiguration['data']>();

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      'y-axis-temp': {
        position: 'left',
        max: 40,
        min: -20,
        title: {
          text: this.translate.instant('Temperature'),
          display: true,
        },
      },
      'y-axis-humidity': {
        max: 100,
        min: 0,
        position: 'right',
        title: {
          text: this.translate.instant('Humidity / Rain'),
          display: true,
        },
      },
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          mode: 'x',
          pinch: {
            enabled: true,
          },
          wheel: {
            enabled: true,
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  constructor(
    private readonly weatherService: WeatherService,
    private readonly translate: TranslateService
  ) {}

  ngOnInit(): void {
    const today = new Date();
    const start = subWeeks(today, 26);
    this.weatherService
      .weatherControllerGetHistoric({
        from: start.toISOString(),
        to: today.toISOString(),
      })
      .pipe(
        map(({ weather }): ChartConfiguration['data'] => {
          return {
            datasets: [
              {
                label: this.translate.instant('Temperature'),
                data: weather.map((d) => d.temperature),
                yAxisID: 'y-axis-temp',
              },
              {
                label: this.translate.instant('Humidity'),
                data: weather.map((d) => d.humidity),
                yAxisID: 'y-axis-humidity',
              },
              {
                label: this.translate.instant('Rain'),
                data: weather.map((d) => d.rain * 100 ?? 0),
                yAxisID: 'y-axis-humidity',
              },
            ],
            labels: weather.map((d) =>
              format(new Date(d.timestamp), 'dd-MM-yy')
            ),
          };
        })
      )
      .subscribe((data) => {
        this.weatherData.next(data);
      });
  }
}
