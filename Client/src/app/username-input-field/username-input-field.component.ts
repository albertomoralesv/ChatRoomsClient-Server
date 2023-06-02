import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-username-input-field',
  templateUrl: './username-input-field.component.html',
  styleUrls: ['./username-input-field.component.scss'],
})
export class UsernameInputFieldComponent implements OnInit {

  @Output() usernameInput = new EventEmitter<string>();
  userName: string = '';

  constructor() { }

  ngOnInit() {}

  emit(){
    const user = this.userName.replace(/\s/g, "");
    this.usernameInput.emit(user);
  }

}

