import { Component } from '@angular/core';
import { LinkSliderOptions } from '../widgets/link-slider/link-slider.component';

@Component({
  selector: 'rooftop-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  linkCards: LinkSliderOptions = [
    {
      title: 'Beds',
      imageUrl: 'assets/images/home-slider/beds.jpg',
      routerLink: ['/boards'],
    },
    {
      title: 'Watering',
      imageUrl: 'assets/images/home-slider/watering.jpg',
      routerLink: ['/watering'],
    },
    {
      title: 'Sensors',
      imageUrl: 'assets/images/home-slider/sensors.jpg',
      routerLink: ['/sensors'],
    },
  ];
}
