import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rooftop-board-settings',
  templateUrl: './board-settings.component.html',
  styleUrls: ['./board-settings.component.scss'],
})
export class BoardSettingsPage implements OnInit {
  readonly alertOptions = {
    header: 'Select a bed',
    subHeader: 'Select the bed where the board is installed',
    translucent: true,
  };

  constructor() {}

  ngOnInit(): void {}
}
