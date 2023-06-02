import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-password-input-field',
  templateUrl: './password-input-field.component.html',
  styleUrls: ['./password-input-field.component.scss'],
})
export class PasswordInputFieldComponent  implements OnInit {

  @Output() passwordInput = new EventEmitter<string>();
  userPassword: string = '';

  constructor() { }

  ngOnInit() {}

  emit(){
    this.passwordInput.emit(this.userPassword);
  }
}
