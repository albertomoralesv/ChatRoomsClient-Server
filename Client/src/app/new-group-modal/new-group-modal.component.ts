import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { HttpRequestsService } from '../http-requests.service';

@Component({
  selector: 'app-new-group-modal',
  templateUrl: './new-group-modal.component.html',
  styleUrls: ['./new-group-modal.component.scss'],
})
export class NewGroupModalComponent  implements OnInit {
  groupName:string = '';
  serverStatus = true;
  loading = false;
  error = false;
  incorrectMessage: string = '';
  groupCreated = false;

  constructor(private modalController: ModalController, private toastController: ToastController , private httpRequestsService: HttpRequestsService) { }

  ngOnInit() {}

  close() {
    return this.modalController.dismiss('cancel');
  }

  onNewGroupChatNameChange(groupChatName: string){
    this.groupName = groupChatName;
  }

  createGroup(){
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
          this.httpRequestsService.createGroup(this.groupName).subscribe(
            (result) => {
              this.loading = false;
              // Successful login
              console.log('create group:', result);
              if(result){
                this.groupCreated = true;
                this.showToast();
                this.close();
              }else{
                this.error = true;
                this.incorrectMessage = 'Group Name Already exists';
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
      header: 'Group Created',
      duration: 4000
    });

    await toast.present();
  }

}
