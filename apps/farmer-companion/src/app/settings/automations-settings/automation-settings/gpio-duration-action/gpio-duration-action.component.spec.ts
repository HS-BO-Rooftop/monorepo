import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpioDurationActionComponent } from './gpio-duration-action.component';

describe('GpioDurationActionComponent', () => {
  let component: GpioDurationActionComponent;
  let fixture: ComponentFixture<GpioDurationActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GpioDurationActionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GpioDurationActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
