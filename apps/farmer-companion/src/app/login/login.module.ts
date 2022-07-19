import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginFormComponent } from './login-form/login-form.component';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';
import { PasswordResetCodeComponent } from './password-reset-code/password-reset-code.component';
import { PasswordResetSetNewComponent } from './password-reset-set-new/password-reset-set-new.component';
import { LoginContainerComponent } from './login-container/login-container.component';
import { LandingContainerModule } from '../landing/landing-background-container/landing-background-container.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
