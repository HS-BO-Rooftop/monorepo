import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardSettingsPage } from './board-settings.component';

describe('BoardSettingsComponent', () => {
  let component: BoardSettingsPage;
  let fixture: ComponentFixture<BoardSettingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardSettingsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
