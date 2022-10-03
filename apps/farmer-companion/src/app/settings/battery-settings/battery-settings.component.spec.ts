import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatterySettingsPage } from './battery-settings.component';

describe('BatterySettingsComponent', () => {
  let component: BatterySettingsPage;
  let fixture: ComponentFixture<BatterySettingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatterySettingsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BatterySettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
