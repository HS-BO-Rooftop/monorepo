import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetSetNewComponent } from './password-reset-set-new.component';

describe('PasswordResetSetNewComponent', () => {
  let component: PasswordResetSetNewComponent;
  let fixture: ComponentFixture<PasswordResetSetNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordResetSetNewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordResetSetNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
