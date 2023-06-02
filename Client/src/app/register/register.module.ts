import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { RegisterButtonComponent } from '../register-button/register-button.component';
import { UsernameInputFieldComponent } from '../username-input-field/username-input-field.component';
import { PasswordInputFieldComponent } from '../password-input-field/password-input-field.component';
import { AuthInputComponentsModule } from '../auth-input-components/auth-input-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    AuthInputComponentsModule
  ],
  declarations: [RegisterPage, RegisterButtonComponent]
})
export class RegisterPageModule {}
