import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedsSettingsPage } from './beds-settings.component';

describe('BedsSettingsComponent', () => {
  let component: BedsSettingsPage;
  let fixture: ComponentFixture<BedsSettingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BedsSettingsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BedsSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
