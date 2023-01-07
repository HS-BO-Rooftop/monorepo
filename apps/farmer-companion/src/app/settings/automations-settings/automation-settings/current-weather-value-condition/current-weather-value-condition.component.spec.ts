import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherValueConditionComponent } from './current-weather-value-condition.component';

describe('WeatherValueConditionComponent', () => {
  let component: WeatherValueConditionComponent;
  let fixture: ComponentFixture<WeatherValueConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherValueConditionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherValueConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
