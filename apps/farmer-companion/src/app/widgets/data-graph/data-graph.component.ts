import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { first, Observable, timer } from 'rxjs';

export type LineData = {
  name: string;
  series: {
    name: string;
    value: number;
  }[];
};

export type LineChartData = LineData[];

@Component({
  selector: 'rooftop-data-graph',
  templateUrl: './data-graph.component.html',
  styleUrls: ['./data-graph.component.scss'],
})
export class DataGraphComponent implements AfterViewInit {
  @Input() data?: Observable<ChartConfiguration['data']>;
  @Input() defaultZoom = 1;

  @Input() options: ChartConfiguration['options'] = {
    responsive: true,
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

  @ViewChild(BaseChartDirective, { static: true }) chart?: BaseChartDirective;

  constructor() {}

  ngAfterViewInit(): void {
    this.data?.pipe(first()).subscribe(() => {
      const chart = this.chart?.chart as any;
      if (chart) {
        timer(100).subscribe(() => {
          chart.zoom({ x: this.defaultZoom, y: 1 });
          // Pan to the end
          chart.pan({ x: -Infinity, y: 0 });
        });
      }
    });
  }
}
