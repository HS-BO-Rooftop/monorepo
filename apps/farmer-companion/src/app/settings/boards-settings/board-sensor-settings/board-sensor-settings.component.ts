import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { BoardPinDto, SensorConfigurationDto } from '../../../api/models';
import { BoardPinsService, SensorsService } from '../../../api/services';
import { loadingHelper, LoadingService } from '../../../loading.service';

@Component({
  selector: 'rooftop-board-sensor-settings',
  templateUrl: './board-sensor-settings.component.html',
  styleUrls: ['./board-sensor-settings.component.css'],
})
export class BoardSensorSettingsPage implements OnInit {
  boardId = '';

  readonly alertOptions = {
    header:
      this.translation.instant('Select a sensor type') ??
      'Select a sensor type',
    subHeader:
      this.translation.instant('Select the type of sensor') ??
      'Select the type of sensor',
    translucent: true,
  };

  readonly sensorConfigurations = new BehaviorSubject<
    SensorConfigurationDto[] | null
  >(null);
  readonly boardPins = new BehaviorSubject<BoardPinDto[] | null>(null);

  constructor(
    private route: ActivatedRoute,
    private translation: TranslateService,
    private readonly sensorsService: SensorsService,
    private readonly boardPinsService: BoardPinsService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.boardId = this.route.snapshot.paramMap.get('boardId') as string;
    loadingHelper([this.sensorConfigurations, this.boardPins]).subscribe(
      (loading) => (this.loadingService.loading = loading)
    );
    this.getSensorTypes();
    this.getBoardPins();
  }

  private getSensorTypes(): void {
    this.sensorsService.findAllSensors().subscribe((sensorTypes) => {
      this.sensorConfigurations.next(sensorTypes);
    });
  }

  private getBoardPins(): void {
    this.boardPinsService.findAllBoardPins().subscribe((boardPins) => {
      this.boardPins.next(boardPins);
    });
  }
}
