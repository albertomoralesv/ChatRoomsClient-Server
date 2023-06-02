import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

import { UsernameInputFieldComponent } from '../username-input-field/username-input-field.component';
import { PasswordInputFieldComponent } from '../password-input-field/password-input-field.component';
import { LoginButtonComponent } from '../login-button/login-button.component';
import { AuthInputComponentsModule } from '../auth-input-components/auth-input-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    AuthInputComponentsModule
  ],
  declarations: [LoginPage, LoginButtonComponent]
})
export class LoginPageModule {}
