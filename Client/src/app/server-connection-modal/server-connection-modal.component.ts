import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpRequestsService } from '../http-requests.service';

@Component({
  selector: 'app-server-connection-modal',
  templateUrl: './server-connection-modal.component.html',
  styleUrls: ['./server-connection-modal.component.scss'],
})
export class ServerConnectionModalComponent  implements OnInit {
  nodeAddress: string;
  nodePort: string;
  socketAddress: string;
  socketPort: string;

  serverTestLoading = false;

  incorrectMessage: string = '';

  constructor(private modalController: ModalController, public httpRequestsService: HttpRequestsService) {
    this.nodeAddress = this.httpRequestsService.getNodeAddress();
    this.nodePort = this.httpRequestsService.getNodePort();
    this.socketAddress = this.httpRequestsService.getSocketAddress();
    this.socketPort = this.httpRequestsService.getSocketPort();
  }

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }

  async cancel(){
    //await this.httpRequestsService.prevServerConfig();
    this.closeModal();
  }

  saveServerConfig(){
    if(this.nodeAddress!='' && this.nodePort!='' && this.socketAddress!='' && this.socketPort!=''){
      this.httpRequestsService.setNodeAddress(this.nodeAddress);
      this.httpRequestsService.setNodePort(this.nodePort);
      this.httpRequestsService.setSocketAddress(this.socketAddress);
      this.httpRequestsService.setSocketPort(this.socketPort);
      this.closeModal();
    }else{
      this.incorrectMessage = 'Enter both addresses and ports to save';
    }
  }

  onNodeAddressChange(nodeAddress: string){
    this.nodeAddress = nodeAddress;
    this.incorrectMessage = '';
  }

  onNodePortChange(nodePort: string){
    this.nodePort = nodePort;
    this.incorrectMessage = '';
  }

  onSocketAddressChange(socketAddress: string){
    this.socketAddress = socketAddress;
    this.incorrectMessage = '';
  }

  onSocketPortChange(socketPort: string){
    this.socketPort = socketPort;
    this.incorrectMessage = '';
  }

  async testServerConnection() {
    if (this.nodeAddress !== '' && this.nodePort !== '' && this.socketAddress !== '' && this.socketPort !== '') {
      this.incorrectMessage = '';
      console.log("test");
      this.serverTestLoading = true;
      try {
        const data = await this.httpRequestsService.testBothServers(this.nodeAddress, this.nodePort, this.socketAddress, this.socketPort).toPromise();
        this.serverTestLoading = false;
        if (data !== 'error') {
          /*
          this.httpRequestsService.setNodeAddress(this.nodeAddress);
          this.httpRequestsService.setNodePort(this.nodePort);
          this.httpRequestsService.setSocketAddress(this.socketAddress);
          this.httpRequestsService.setSocketPort(this.socketPort);
          this.httpRequestsService.serverActive = true;
          */
          if(data.status){
            this.httpRequestsService.setNodeAddress(this.nodeAddress);
            this.httpRequestsService.setNodePort(this.nodePort);
            this.httpRequestsService.setSocketAddress(this.socketAddress);
            this.httpRequestsService.setSocketPort(this.socketPort);
            this.incorrectMessage = 'Server Active';
            console.log("Server Active");
          }else{
            this.incorrectMessage = 'Socket Server Inactive'
          }
        } else {
          //this.httpRequestsService.serverActive = false;
          //this.httpRequestsService.server2Active = false;
          this.incorrectMessage = 'Node Server Inactive';
          console.log("Server disconnected");
        }

        // Code to run after the testServer method completes
        console.log("End Test");
        // Additional code...
      } catch (error) {
        // Handle error if needed
      }
    } else {
      this.incorrectMessage = 'Enter both addresses and ports';
    }
  }


}
