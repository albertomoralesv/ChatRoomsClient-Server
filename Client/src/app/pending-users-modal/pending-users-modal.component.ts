import { Component, Input, NgIterable, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  selector: 'app-pending-users-modal',
  templateUrl: './pending-users-modal.component.html',
  styleUrls: ['./pending-users-modal.component.scss'],
})
export class PendingUsersModalComponent  implements OnInit {
  @Input() groupName: string = '';

  pending2: Array<string | User | Message> = [];
  iterablePendingUsers: NgIterable<string> = [];

  constructor(private modalController: ModalController, private httpRequestsService: HttpRequestsService) {
    if(this.groupName != ''){
      this.httpRequestsService.getGroupPending(this.groupName).subscribe(
        (result) => {
          console.log(this.httpRequestsService.groupsData[this.groupName]['pending']);
          console.log(this.groupName);
          this.pending2 = this.httpRequestsService.groupsData[this.groupName]['pending']
          this.iterablePendingUsers = this.pending2 as NgIterable<string>;
          this.httpRequestsService.getUsers().subscribe(
            (result) => {
              console.log(this.httpRequestsService.allUsers);
              console.log(this.groupName);
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
  }

  ngOnInit() {
    if(this.groupName != ''){
      this.httpRequestsService.getGroupPending(this.groupName).subscribe(
        (result) => {
          console.log(this.httpRequestsService.groupsData[this.groupName]['pending']);
          console.log(this.groupName);
          this.pending2 = this.httpRequestsService.groupsData[this.groupName]['pending']
          this.iterablePendingUsers = this.pending2 as NgIterable<string>;
          this.httpRequestsService.getUsers().subscribe(
            (result) => {
              console.log(this.httpRequestsService.allUsers);
              console.log(this.groupName);
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
  }

  handleGroupNameChange() {
    if(this.groupName!=''){
      this.httpRequestsService.getGroupPending(this.groupName).subscribe(
        (result) => {
          console.log(this.httpRequestsService.groupsData[this.groupName]['pending']);
          console.log(this.groupName);
          this.pending2 = this.httpRequestsService.groupsData[this.groupName]['pending']
          this.iterablePendingUsers = this.pending2 as NgIterable<string>;
          this.httpRequestsService.getUsers().subscribe(
            (result) => {
              console.log(this.httpRequestsService.allUsers);
              console.log(this.groupName);
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

    // Your logic when the groupName changes
    console.log('groupName changed:', this.groupName);
    // Call any other functions or perform actions as needed
  }

  close() {
    return this.modalController.dismiss('cancel');
  }

  accept(newUser: string){
    this.httpRequestsService.acceptJoinRequest(newUser,this.groupName).subscribe(
      (result) => {
        console.log(this.httpRequestsService.allUsers);
        console.log(this.groupName);
        this.httpRequestsService.getGroupPending(this.groupName).subscribe(
          (result) => {
            console.log(this.httpRequestsService.groupsData[this.groupName]['pending']);
            console.log(this.groupName);
            this.pending2 = this.httpRequestsService.groupsData[this.groupName]['pending']
            this.iterablePendingUsers = this.pending2 as NgIterable<string>;
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
  reject(newUser: string){
    this.httpRequestsService.rejectJoinRequest(newUser,this.groupName).subscribe(
      (result) => {
        console.log(this.httpRequestsService.allUsers);
        console.log(this.groupName);
        this.httpRequestsService.getGroupPending(this.groupName).subscribe(
          (result) => {
            console.log(this.httpRequestsService.groupsData[this.groupName]['pending']);
            console.log(this.groupName);
            this.pending2 = this.httpRequestsService.groupsData[this.groupName]['pending']
            this.iterablePendingUsers = this.pending2 as NgIterable<string>;
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

}
