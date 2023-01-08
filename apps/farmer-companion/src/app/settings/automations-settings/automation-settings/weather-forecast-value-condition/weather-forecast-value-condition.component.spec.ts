import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherForecastValueConditionComponent } from './weather-forecast-value-condition.component';

describe('WeatherForecastValueConditionComponent', () => {
  let component: WeatherForecastValueConditionComponent;
  let fixture: ComponentFixture<WeatherForecastValueConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherForecastValueConditionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherForecastValueConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
