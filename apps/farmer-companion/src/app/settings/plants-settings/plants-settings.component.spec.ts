import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsSettingsPage } from './plants-settings.component';

describe('PlantsSettingsComponent', () => {
  let component: PlantsSettingsPage;
  let fixture: ComponentFixture<PlantsSettingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantsSettingsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PlantsSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
