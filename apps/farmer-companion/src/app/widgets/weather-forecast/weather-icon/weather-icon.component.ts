import { Component, Input, OnInit } from '@angular/core';
import { WeatherForcastDto } from '../../../api/models';

export type Icons = WeatherForcastDto['icon'];

@Component({
  selector: 'rooftop-weather-icon',
  templateUrl: './weather-icon.component.html',
  styleUrls: ['./weather-icon.component.scss'],
})
export class WeatherIconComponent implements OnInit {
  @Input() icon?: Icons;

  mapIconToUrl(icon: Icons): string {
    if (!icon) {
      return '';
    }
    return `assets/icons/weather/${icon.replace(/-/gm, '_')}.svg`;
  }

  constructor() {}

  ngOnInit(): void {}
}
