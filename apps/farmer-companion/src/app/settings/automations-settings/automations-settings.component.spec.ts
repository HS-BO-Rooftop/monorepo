import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationsSettingsPage } from './automations-settings.component';

describe('AutomationSettingsComponent', () => {
  let component: AutomationsSettingsPage;
  let fixture: ComponentFixture<AutomationsSettingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutomationsSettingsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AutomationsSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
