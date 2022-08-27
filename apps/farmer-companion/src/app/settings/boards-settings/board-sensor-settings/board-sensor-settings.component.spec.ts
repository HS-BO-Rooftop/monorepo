import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardSensorSettingsPage } from './board-sensor-settings.component';

describe('BoardSensorSettingsComponent', () => {
  let component: BoardSensorSettingsPage;
  let fixture: ComponentFixture<BoardSensorSettingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardSensorSettingsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardSensorSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
