import { Component, OnInit } from '@angular/core';
import { HttpRequestsService } from '../http-requests.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NewGroupModalComponent } from '../new-group-modal/new-group-modal.component';
import { JoinGroupModalComponent } from '../join-group-modal/join-group-modal.component';
import { empty } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  selectedGroup: string = '';

  serverStatus: boolean = true;

  constructor(private router: Router, private httpRequestsService: HttpRequestsService, private modalController: ModalController) {
    if(this.httpRequestsService.getLoggedUsername()==''){
      this.router.navigateByUrl('/home', { replaceUrl: true });
    }else{
      console.log(this.httpRequestsService.getLoggedUsername());
    }
  }

  ngOnInit() {
  }

  onCustomEvent(value: string) {
    // Handle the custom event emitted by the child component
    if(this.selectedGroup === value){
      this.selectedGroup = ' '+value;
    }else{
      this.selectedGroup = value;
    }
    console.log(this.selectedGroup);
  }

  logout(){
    this.httpRequestsService.logout();
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }

  async newGroup() {
    const modal = await this.modalController.create({
      component: NewGroupModalComponent,
      backdropDismiss: false,
      cssClass: 'new-group-modal',
    });
    modal.present();
  }

  async joinGroup() {
    const modal = await this.modalController.create({
      component: JoinGroupModalComponent,
      backdropDismiss: false,
      cssClass: 'join-group-modal',
    });
    modal.present();
  }
}
