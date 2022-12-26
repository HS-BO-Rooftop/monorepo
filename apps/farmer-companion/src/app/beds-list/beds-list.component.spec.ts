import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedsListPage } from './beds-list.component';

describe('BedsListComponent', () => {
  let component: BedsListPage;
  let fixture: ComponentFixture<BedsListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BedsListPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BedsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
