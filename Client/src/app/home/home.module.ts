import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ServerConnectionModalComponent } from '../server-connection-modal/server-connection-modal.component';
import { NodeAddressInputFieldComponent } from '../node-address-input-field/node-address-input-field.component';
import { SocketAddressInputFieldComponent } from '../socket-address-input-field/socket-address-input-field.component';
import { SocketPortInputFieldComponent } from '../socket-port-input-field/socket-port-input-field.component';
import { NodePortInputFieldComponent } from '../node-port-input-field/node-port-input-field.component';
import { MakeServerTestButtonComponent } from '../make-server-test-button/make-server-test-button.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [
    HomePage,
    ServerConnectionModalComponent,
    NodeAddressInputFieldComponent,
    NodePortInputFieldComponent,
    SocketAddressInputFieldComponent,
    SocketPortInputFieldComponent,
    MakeServerTestButtonComponent
  ],
})
export class HomePageModule {}
