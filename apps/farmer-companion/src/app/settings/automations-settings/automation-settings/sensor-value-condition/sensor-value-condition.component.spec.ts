import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorValueConditionComponent } from './sensor-value-condition.component';

describe('SensorValueConditionComponent', () => {
  let component: SensorValueConditionComponent;
  let fixture: ComponentFixture<SensorValueConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SensorValueConditionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SensorValueConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
