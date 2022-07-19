import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../common/password-match.validator';
import {
  headShakeOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';

@Component({
  selector: 'rooftop-password-reset-set-new',
  templateUrl: './password-reset-set-new.component.html',
  styleUrls: ['./password-reset-set-new.component.scss'],
  animations: [
    headShakeOnEnterAnimation(),
    fadeOutOnLeaveAnimation({
      duration: 300,
    }),
  ],
})
export class PasswordResetSetNewComponent implements OnInit {
  public form = this.fb.group(
    {
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(8)]],
    },
    { validators: [passwordMatchValidator] }
  );

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
