import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsSettingsPage } from './boards-settings.component';

describe('BoardsSettingsComponent', () => {
  let component: BoardsSettingsPage;
  let fixture: ComponentFixture<BoardsSettingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardsSettingsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardsSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
