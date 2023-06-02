import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PruebapgPageRoutingModule } from './pruebapg-routing.module';

import { PruebapgPage } from './pruebapg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PruebapgPageRoutingModule
  ],
  declarations: [PruebapgPage]
})
export class PruebapgPageModule {}
