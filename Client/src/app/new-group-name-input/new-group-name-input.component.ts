import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-group-name-input',
  templateUrl: './new-group-name-input.component.html',
  styleUrls: ['./new-group-name-input.component.scss'],
})
export class NewGroupNameInputComponent  implements OnInit {
  @Output() newGroupChatNameInput = new EventEmitter<string>();
  groupChatName: string = '';

  constructor() { }

  ngOnInit() {}

  emit(){
    this.newGroupChatNameInput.emit(this.groupChatName);
  }

}
