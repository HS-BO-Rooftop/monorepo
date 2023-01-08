import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeValueConditionComponent } from './time-value-condition.component';

describe('TimeValueConditionComponent', () => {
  let component: TimeValueConditionComponent;
  let fixture: ComponentFixture<TimeValueConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeValueConditionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeValueConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
