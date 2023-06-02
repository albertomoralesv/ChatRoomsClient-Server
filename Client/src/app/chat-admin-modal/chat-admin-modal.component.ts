import { Component, Input, NgIterable, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpRequestsService } from '../http-requests.service';
import { PendingUsersModalComponent } from '../pending-users-modal/pending-users-modal.component';

interface Message {
  sender: string;
  content: string;
}

interface User {
  username: string;
  role: string;
}

@Component({
  selector: 'app-chat-admin-modal',
  templateUrl: './chat-admin-modal.component.html',
  styleUrls: ['./chat-admin-modal.component.scss'],
})
export class ChatAdminModalComponent  implements OnInit {
  @Input() groupName: string = '';
  selectedUser: string = ''; // or the appropriate type for your use case
  admin: boolean = false;
  users2: Array<string | User | Message> = [];

  iterableUsers: NgIterable<User> = [];

  constructor(private modalController: ModalController, public httpRequestsService: HttpRequestsService) { }

  ngOnInit() {}

  ionViewDidEnter() {
    // Perform actions when the modal is opened or parameter changes
    this.handleGroupNameChange();
    console.log('Modal opened or parameter changed.');
  }

  handleGroupNameChange() {
    this.httpRequestsService.getGroupUsers(this.groupName).subscribe(
      (result) => {
        console.log(this.httpRequestsService.groupsData[this.groupName]['users']);
        console.log(this.groupName);
        this.users2 = this.httpRequestsService.groupsData[this.groupName]['users']
        this.iterableUsers = this.users2 as NgIterable<User>;
        this.httpRequestsService.getGroupPending(this.groupName).subscribe(
          (result) => {
            console.log(this.httpRequestsService.groupsData[this.groupName]['pending']);
            console.log(this.groupName);
            this.httpRequestsService.getUsers().subscribe(
              (result) => {
                console.log(this.httpRequestsService.allUsers);
                console.log(this.groupName);
                for(let user of this.iterableUsers){
                  if(user.username === this.httpRequestsService.loggedUsername){
                    if(user.role !== '0'){
                      console.log("true");
                      this.admin = true;
                    }else{
                      console.log("false1");
                      this.admin = false;
                    }
                  }
                }
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
      },
      (error) => {
        console.log('Login error:', error);
      }
    );
    // Your logic when the groupName changes
    console.log('groupName changed:', this.groupName);
    // Call any other functions or perform actions as needed
  }

  close() {
    return this.modalController.dismiss('cancel');
  }

  isUserInGroup(username: string): boolean {
    const users = this.httpRequestsService.groupsData[this.groupName]['users'];
    const groupUsers: User[] = users.filter(user => typeof user !== 'string') as User[];
    const isUsernameExists = groupUsers.some(user => user.username === username);
    const isUsernamePending = this.httpRequestsService.groupsData[this.groupName]['pending'].includes(username);

    return !isUsernameExists && !isUsernamePending;
  }

  async pendingReq() {
    const modal = await this.modalController.create({
      component: PendingUsersModalComponent,
      backdropDismiss: false,
      cssClass: 'admin-group-modal',
      componentProps: {
        groupName: this.groupName
      }
    },);
    modal.present();
  }

  addUser(){
    const newUser = this.selectedUser;
    this.selectedUser = '';
    this.httpRequestsService.addUserToGroup(newUser, this.groupName).subscribe(
      (result) => {
        this.httpRequestsService.getUsers().subscribe(
          (result) => {
            console.log(this.httpRequestsService.allUsers);
            this.httpRequestsService.getGroupUsers(this.groupName).subscribe(
              (result) => {
                console.log(this.httpRequestsService.allUsers);
                this.users2 = this.httpRequestsService.groupsData[this.groupName]['users']
                this.iterableUsers = this.users2 as NgIterable<User>;
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
      },
      (error) => {
        console.log('Login error:', error);
      }
    );
  }

  userIsNotMember(){
    this.httpRequestsService.getGroupUsers(this.groupName).subscribe(
      (result) => {
        console.log(this.httpRequestsService.allUsers);
        this.users2 = this.httpRequestsService.groupsData[this.groupName]['users']
        this.iterableUsers = this.users2 as NgIterable<User>;
        console.log(this.iterableUsers);
        for(let user of this.iterableUsers){
          if(user.username === this.httpRequestsService.loggedUsername){
            if(user.role !== '0'){
              console.log("true");
              return true;
            }else{
              console.log("false1");
              return false;
            }
          }
        }
        console.log("false2");
        return false;
      },
      (error) => {
        console.log('Login error:', error);
        return false;
      }
    );
    return false;
  }

}
