import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetCodeComponent } from './password-reset-code.component';

describe('PasswordResetCodeComponent', () => {
  let component: PasswordResetCodeComponent;
  let fixture: ComponentFixture<PasswordResetCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordResetCodeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordResetCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
