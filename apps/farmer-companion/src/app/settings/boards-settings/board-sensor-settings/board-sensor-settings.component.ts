import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'rooftop-board-sensor-settings',
  templateUrl: './board-sensor-settings.component.html',
  styleUrls: ['./board-sensor-settings.component.css'],
})
export class BoardSensorSettingsPage implements OnInit {
  boardId = '';

  readonly alertOptions = {
    header:
      this.translation.instant('Select a sensor type') ||
      'Select a sensor type',
    subHeader:
      this.translation.instant('Select the type of sensor') ||
      'Select the type of sensor',
    translucent: true,
  };

  readonly sensorTypes: SensorType[] = [
    {
      id: '1',
      name: 'DS1820',
    },
    {
      id: '2',
      name: 'DS18B20',
    },
    {
      id: '3',
      name: 'Capacitive Moisture Sensor',
    },
  ];

  readonly sensorPins: SensorPin[] = [
    {
      id: '1',
      name: 'A0',
    },
    {
      id: '2',
      name: 'A1',
    },
    {
      id: '3',
      name: 'A2',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private translation: TranslateService
  ) {}

  ngOnInit(): void {
    this.boardId = this.route.snapshot.paramMap.get('boardId') as string;
  }
}

type SensorType = {
  name: string;
  id: string;
};

type SensorPin = {
  name: string;
  id: string;
};
