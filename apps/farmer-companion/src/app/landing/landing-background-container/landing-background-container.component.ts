import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rooftop-landing-container',
  templateUrl: './landing-background-container.component.html',
  styleUrls: ['./landing-background-container.component.scss'],
})
export class LandingContainerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [LandingContainerComponent],
  exports: [LandingContainerComponent],
})
export class LandingContainerModule {}
