import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationSettingsPage } from './automation-settings.component';

describe('AutomationSettingsComponent', () => {
  let component: AutomationSettingsPage;
  let fixture: ComponentFixture<AutomationSettingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutomationSettingsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AutomationSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
