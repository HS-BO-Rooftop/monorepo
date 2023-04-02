import { Component, Input, OnInit } from '@angular/core';

export type LinkSliderCardOptions = {
  title: string;
  imageUrl: string;
  routerLink: any[] | string | null | undefined;
  disabled?: boolean;
};

@Component({
  selector: 'rooftop-link-slider-card',
  templateUrl: './link-slider-card.component.html',
  styleUrls: ['./link-slider-card.component.scss'],
})
export class LinkSliderCardComponent implements OnInit {
  @Input() options?: LinkSliderCardOptions;
  @Input() disabled?: boolean;

  constructor() {}

  ngOnInit(): void {}
}
