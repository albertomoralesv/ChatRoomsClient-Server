import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { HttpRequestsService } from '../http-requests.service';

@Component({
  selector: 'app-join-group-modal',
  templateUrl: './join-group-modal.component.html',
  styleUrls: ['./join-group-modal.component.scss'],
})
export class JoinGroupModalComponent  implements OnInit {
  groupName:string = '';
  serverStatus = true;
  loading = false;
  error = false;
  incorrectMessage: string = '';
  joinedGroup = false;

  constructor(private modalController: ModalController, private toastController: ToastController , private httpRequestsService: HttpRequestsService) { }

  ngOnInit() {}

  close() {
    return this.modalController.dismiss('cancel');
  }

  onJoinGroupChatNameChange(groupChatName: string){
    this.groupName = groupChatName;
  }

  joinGroup(){
    if(this.groupName != ''){
      this.incorrectMessage = '';
      this.loading = true;
      this.httpRequestsService.makeTest().subscribe(() => {
        if(!this.httpRequestsService.nodeServerActive || !this.httpRequestsService.socketServerActive){
          this.loading = false;
          // Server Offline
          this.serverStatus = false;
          this.error = true;
          this.incorrectMessage = 'Server Offline';
          console.log("Server Offline");
        }else{
          this.serverStatus = true;
          this.error = false;
          this.incorrectMessage = '';
          // Server Online
          this.httpRequestsService.joinGroup(this.groupName).subscribe(
            (result) => {
              this.loading = false;
              console.log('join group:', result);
              if(result.status == 1){
                this.joinedGroup = true;
                this.showToast();
                this.close();
              }else{
                this.error = true;
                this.incorrectMessage = result.message;
              }
            },
            (error) => {
              this.loading = false;
              // Error
              this.error = true;
              this.incorrectMessage = 'error';
              console.log('error: ', error);
            }
          );
        }
      });
    }else{
      this.error = true;
      this.incorrectMessage = "Empty Group Name";
      console.log("Empty Group Name");
    }
  }

  async showToast() {
    const toast = await this.toastController.create({
      header: 'Joined Group',
      duration: 4000
    });

    await toast.present();
  }
}
