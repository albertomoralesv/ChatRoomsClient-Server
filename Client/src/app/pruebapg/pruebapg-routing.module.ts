import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PruebapgPage } from './pruebapg.page';

const routes: Routes = [
  {
    path: '',
    component: PruebapgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PruebapgPageRoutingModule {}
