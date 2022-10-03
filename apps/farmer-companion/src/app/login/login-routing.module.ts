import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { PasswordResetCodeComponent } from './password-reset-code/password-reset-code.component';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';
import { PasswordResetSetNewComponent } from './password-reset-set-new/password-reset-set-new.component';
const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent,
  },
  {
    path: 'password-reset',
    component: PasswordResetRequestComponent,
  },
  {
    path: 'password-reset-code',
    component: PasswordResetCodeComponent,
  },
  {
    path: 'set-new-password',
    component: PasswordResetSetNewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
