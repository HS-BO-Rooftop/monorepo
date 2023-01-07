import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleGpioActionComponent } from './toggle-gpio-action.component';

describe('ToggleGpioActionComponent', () => {
  let component: ToggleGpioActionComponent;
  let fixture: ComponentFixture<ToggleGpioActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToggleGpioActionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleGpioActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
