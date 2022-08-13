import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorsSettingsPage } from './sensors-settings.component';

describe('SensorsSettingsComponent', () => {
  let component: SensorsSettingsPage;
  let fixture: ComponentFixture<SensorsSettingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SensorsSettingsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SensorsSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
