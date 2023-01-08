import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSinceLastRunConditionComponent } from './time-since-last-run-condition.component';

describe('TimeSinceLastRunConditionComponent', () => {
  let component: TimeSinceLastRunConditionComponent;
  let fixture: ComponentFixture<TimeSinceLastRunConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeSinceLastRunConditionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeSinceLastRunConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
