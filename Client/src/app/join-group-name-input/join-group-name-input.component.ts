import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-join-group-name-input',
  templateUrl: './join-group-name-input.component.html',
  styleUrls: ['./join-group-name-input.component.scss'],
})
export class JoinGroupNameInputComponent  implements OnInit {
  @Output() joinGroupChatNameInput = new EventEmitter<string>();
  groupChatName: string = '';

  constructor() { }

  ngOnInit() {}

  emit(){
    this.joinGroupChatNameInput.emit(this.groupChatName);
  }

}
