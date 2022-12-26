import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDetailsPage } from './board-details.component';

describe('BoardDetailsComponent', () => {
  let component: BoardDetailsPage;
  let fixture: ComponentFixture<BoardDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardDetailsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
