import { Component } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { ServerConnectionModalComponent } from '../server-connection-modal/server-connection-modal.component';
import { HttpRequestsService } from '../http-requests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isMobile: boolean;

  constructor(private platform: Platform, private router: Router, private modalController: ModalController, public httpRequestsService: HttpRequestsService) {
    this.isMobile = this.platform.is('mobile');
    this.httpRequestsService.makeTest().subscribe(() => {
      if(this.httpRequestsService.nodeServerActive && this.httpRequestsService.socketServerActive){
        if(this.httpRequestsService.getLoggedUsername() != ''){
          this.router.navigateByUrl('/main', { replaceUrl: true });
        }
      }
    });
  }

  closeApp() {
    App.exitApp();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ServerConnectionModalComponent,
      backdropDismiss: false,
    });
    return await modal.present();
  }

}
