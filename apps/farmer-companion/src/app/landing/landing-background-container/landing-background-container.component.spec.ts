import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingContainerComponent } from './landing-background-container.component';

describe('LandingBackgroundContainerComponent', () => {
  let component: LandingContainerComponent;
  let fixture: ComponentFixture<LandingContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
