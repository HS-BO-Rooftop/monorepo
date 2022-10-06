import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkSliderCardComponent } from './link-slider-card.component';

describe('LinkSliderCardComponent', () => {
  let component: LinkSliderCardComponent;
  let fixture: ComponentFixture<LinkSliderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkSliderCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkSliderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
