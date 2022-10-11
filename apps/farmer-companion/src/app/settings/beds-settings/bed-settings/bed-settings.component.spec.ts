import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedSettingsPage } from './bed-settings.component';

describe('BedSettingsComponent', () => {
  let component: BedSettingsPage;
  let fixture: ComponentFixture<BedSettingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BedSettingsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BedSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
