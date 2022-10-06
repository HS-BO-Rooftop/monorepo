import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkSliderComponent } from './link-slider.component';

describe('LinkSliderComponent', () => {
  let component: LinkSliderComponent;
  let fixture: ComponentFixture<LinkSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
