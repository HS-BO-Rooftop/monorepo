import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'rooftop-board-settings',
  templateUrl: './board-settings.component.html',
  styleUrls: ['./board-settings.component.scss'],
})
export class BoardSettingsPage implements OnInit {
  readonly alertOptions = {
    header: this.translation.instant('Select a bed') || 'Select a bed',
    subHeader:
      this.translation.instant('Select the bed where the board is installed') ||
      'Select the bed where the board is installed',
    translucent: true,
  };

  sensors: BoardSensor[] = [
    {
      id: '1',
      name: 'Sensor 1',
    },
    {
      id: '2',
      name: 'Sensor 2',
    },
  ];

  constructor(private readonly translation: TranslateService) {}

  ngOnInit(): void {}
}

type BoardSensor = {
  id: string;
  name: string;
};