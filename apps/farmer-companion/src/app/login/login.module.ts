import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { LandingContainerModule } from '../landing/landing-background-container/landing-background-container.component';
import { LoginContainerComponent } from './login-container/login-container.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { PasswordResetCodeComponent } from './password-reset-code/password-reset-code.component';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';
import { PasswordResetSetNewComponent } from './password-reset-set-new/password-reset-set-new.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LoginPageRoutingModule,
    LandingContainerModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginFormComponent,
    PasswordResetRequestComponent,
    PasswordResetCodeComponent,
    PasswordResetSetNewComponent,
    LoginContainerComponent,
  ],
})
export class LoginPageModule {}
