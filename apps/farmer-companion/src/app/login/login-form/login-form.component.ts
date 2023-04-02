import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppAuthService } from '../../../auth.service';

@Component({
  selector: 'rooftop-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  readonly form = this._fb.group({
    email: this._fb.nonNullable.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._fb.nonNullable.control('', [Validators.required]),
  });

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _authService: AppAuthService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this._authService
      .login(
        this.form.getRawValue().email,
        this.form.getRawValue().password,
        '66bfb8e6-d32d-45aa-8e08-da30a9830936'
      )
      .subscribe(() => {
        this._router.navigate(['/home']);
      });
  }
}
