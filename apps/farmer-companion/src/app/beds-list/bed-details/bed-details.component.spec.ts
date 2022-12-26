import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedDetailsPage } from './bed-details.component';

describe('BedDetailsComponent', () => {
  let component: BedDetailsPage;
  let fixture: ComponentFixture<BedDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BedDetailsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BedDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
