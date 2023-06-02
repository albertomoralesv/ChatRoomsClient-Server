import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsernameInputFieldComponent } from '../username-input-field/username-input-field.component';
import { PasswordInputFieldComponent } from '../password-input-field/password-input-field.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [UsernameInputFieldComponent, PasswordInputFieldComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    UsernameInputFieldComponent, PasswordInputFieldComponent
  ]
})
export class AuthInputComponentsModule { }
