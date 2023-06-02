import { Component, Input, NgIterable, OnInit, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatAdminModalComponent } from '../chat-admin-modal/chat-admin-modal.component';
import { HttpRequestsService } from '../http-requests.service';

interface Message {
  sender: string;
  content: string;
}

interface User {
  username: string;
  role: string;
}

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.scss'],
})
export class ChatScreenComponent  implements OnInit {
  @Input() groupName: string = '';

  newMessage: string = '';

  messages2: Array<string | User | Message> = [];

  // Cast messages to NgIterable<GroupMessage>
  iterableMessages: NgIterable<Message> = [];


  sendMessage() {
    console.log(this.httpRequestsService.groupsData[this.groupName]['conv']);
    this.httpRequestsService.sendMessage(this.groupName, this.newMessage.trim()).subscribe(
      (result) => {
        console.log("mssg:",this.newMessage.trim());
        this.httpRequestsService.getGroupConv(this.groupName).subscribe(
          (result) => {
            console.log(this.groupName, result);
            this.messages2 = this.httpRequestsService.groupsData[this.groupName]['conv']
            this.iterableMessages = this.messages2 as NgIterable<Message>;
            this.newMessage = '';
          },
          (error) => {
            console.log('Login error:', error);
          }
        );
      },
      (error) => {
        console.log('Login error:', error);
      }
    );
  }

  constructor(private modalController: ModalController, public httpRequestsService: HttpRequestsService) {
    console.log('start');
    this.httpRequestsService.getGroupConv(this.groupName).subscribe(
      (result) => {
        //console.log(this.httpRequestsService.groupsData[this.groupName]['conv']);
        console.log(this.groupName);
      },
      (error) => {
        console.log('Login error:', error);
      }
    );
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['groupName'] && !changes['groupName'].firstChange) {
        // Call your function here
        this.handleGroupNameChange();
      }
    }

    handleGroupNameChange() {
      this.groupName = this.groupName.replace(/^\s+/, "");
      this.httpRequestsService.getGroupConv(this.groupName).subscribe(
        (result) => {
          console.log(this.httpRequestsService.groupsData[this.groupName]['conv']);
          console.log(this.groupName);
          this.messages2 = this.httpRequestsService.groupsData[this.groupName]['conv']
          this.iterableMessages = this.messages2 as NgIterable<Message>;
        },
        (error) => {
          console.log('Login error:', error);
        }
      );
      // Your logic when the groupName changes
      console.log('groupName changed:', this.groupName);
      // Call any other functions or perform actions as needed
    }

  closeChatScreen(){
    this.groupName = '';
  }

  async adminGroup() {
    const modal = await this.modalController.create({
      component: ChatAdminModalComponent,
      backdropDismiss: false,
      cssClass: 'admin-group-modal',
      componentProps: {
        groupName: this.groupName
      }
    },);
    modal.present();
  }

  refreshChat(){
    this.httpRequestsService.getGroupConv(this.groupName).subscribe(
      (result) => {
        console.log(this.httpRequestsService.groupsData[this.groupName]['conv']);
        console.log(this.groupName);
        this.messages2 = this.httpRequestsService.groupsData[this.groupName]['conv']
        this.iterableMessages = this.messages2 as NgIterable<Message>;
      },
      (error) => {
        console.log('Login error:', error);
      }
    );
  }
}
