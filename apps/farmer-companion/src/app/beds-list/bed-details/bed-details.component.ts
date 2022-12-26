import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ChartConfiguration } from 'chart.js';
import { format, subDays } from 'date-fns';
import { de, enUS } from 'date-fns/locale';
import { BehaviorSubject, filter, Observable, of } from 'rxjs';
import { BedSensorDataDto, BoardDto, SensorValue } from '../../api/models';
import { BedsService } from '../../api/services';
import { getImageUrlForBoard } from '../../common/get-image-url';
import { LoadingService } from '../../loading.service';
import { ToastService } from '../../toast.service';

@Component({
  selector: 'rooftop-bed-details',
  templateUrl: './bed-details.component.html',
  styleUrls: ['./bed-details.component.scss'],
})
export class BedDetailsPage implements OnInit {
  private _bedName = '';
  public get bedName() {
    return this._bedName;
  }

  private readonly _boards = new BehaviorSubject<BoardDto[]>([]);

  public get $boards() {
    return this._boards.asObservable();
  }

  public readonly getImageUrl = getImageUrlForBoard;

  private readonly _sensorData = new BehaviorSubject<SensorDataCard[]>([]);

  public get $sensorData() {
    return this._sensorData.asObservable();
  }

  chartOptions: ChartConfiguration['options'] = {
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

  constructor(
    private readonly _bedService: BedsService,
    private readonly _loadingService: LoadingService,
    private readonly _toast: ToastService,
    private readonly _route: ActivatedRoute,
    private readonly _translate: TranslateService
  ) {}

  ngOnInit(): void {
    this._route.params
      .pipe(filter((x): x is { id: string } => x['id']))
      .subscribe({
        next: (params) => {
          this.loadBedDetails(params.id);
          this.fetchSensorData(params.id);
        },
      });
  }

  private loadBedDetails(bedId: string) {
    this._bedService.findBed({ id: bedId }).subscribe({
      next: (bed) => {
        this._bedName = bed.name;
        this._boards.next(bed.boards);
      },
    });
  }

  private fetchSensorData(bedId: string) {
    return this._bedService.getSensorDataForBed({
      id: bedId,
      from: subDays(new Date(), 2).toISOString(),
      to: new Date().toISOString(),
    })
    .subscribe({
      next: (data) => {
        this._sensorData.next(this.generateSensorDataCards(data));
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  private generateSensorDataCards(data: BedSensorDataDto[]){
    // Filter out all the boards that don't have any data
    const boardsWithData = data.filter(x => x.data.length > 0);

    // Group the data by sensor type
    const groupedData = new Map<string, SensorData[]>();
    boardsWithData.forEach(({ data, boardName }) => {
      data.forEach(({ sensor, values}) => {
        const name = sensor.sensorType.name;
        const existing = groupedData.get(name);
        if (existing) {
          existing.push({ boardName, values });
        }
        else {
          groupedData.set(name, [{ boardName, values }]);
        }
      })
    });

    // Create the cards
    // Foreach sensor type, create a card
    const cards: SensorDataCard[] = [];
    groupedData.forEach((data, sensorType) => {
      cards.push({
        title: sensorType,
        type: sensorType,
        sensorName: sensorType,
        data,
      });
    });
    return cards;
  }

  public sensorDataToChartData(data: SensorData[]): Observable<ChartConfiguration['data']> {
    if (data.length === 0) {
      return of({
        datasets: [],
        labels: [],
      });
    }

    const datasets = data.map((x) => {
      return {
        label: x.boardName,
        data: x.values.map((y) => y._value),
      };
    });

    // Format in the way Mo. 12:00 format
    const labels = data[0].values.map((x) => format(new Date(x._time), 'EEEEEE HH:mm', 
    {
      locale: this._translate.currentLang === 'de' ? de : enUS
    }));

    return of({
      datasets,
      labels,
    });
  }
}

interface SensorDataCard {
  title: string;
  type: string;
  sensorName: string;
  data: SensorData[];
}

interface SensorData {
  boardName: string;
  values: SensorValue[];
}
