import { Component, Input, OnInit } from '@angular/core';
import SwiperCore, { Pagination } from 'swiper';
import { LinkSliderCardOptions } from './link-slider-card/link-slider-card.component';

SwiperCore.use([Pagination]);

export type LinkSliderOptions = LinkSliderCardOptions[];

@Component({
  selector: 'rooftop-link-slider',
  templateUrl: './link-slider.component.html',
  styleUrls: ['./link-slider.component.scss'],
})
export class LinkSliderComponent implements OnInit {
  @Input() cards: LinkSliderOptions = [];

  constructor() {}

  ngOnInit(): void {}
}
