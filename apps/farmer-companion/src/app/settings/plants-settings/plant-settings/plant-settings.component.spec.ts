import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantSettingsPage } from './plant-settings.component';

describe('PlantSettingsComponent', () => {
  let component: PlantSettingsPage;
  let fixture: ComponentFixture<PlantSettingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantSettingsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PlantSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
