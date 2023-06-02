import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';

import { NewGroupModalComponent } from '../new-group-modal/new-group-modal.component';
import { NewGroupNameInputComponent } from '../new-group-name-input/new-group-name-input.component';
import { JoinGroupModalComponent } from '../join-group-modal/join-group-modal.component';
import { JoinGroupNameInputComponent } from '../join-group-name-input/join-group-name-input.component';
import { ChatScreenComponent } from '../chat-screen/chat-screen.component';
import { GroupsListComponent } from '../groups-list/groups-list.component';
import { ChatAdminModalComponent } from '../chat-admin-modal/chat-admin-modal.component';
import { PendingUsersModalComponent } from '../pending-users-modal/pending-users-modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MainPageRoutingModule],
  declarations: [
    MainPage,
    NewGroupModalComponent,
    NewGroupNameInputComponent,
    JoinGroupModalComponent,
    JoinGroupNameInputComponent,
    ChatScreenComponent,
    GroupsListComponent,
    ChatAdminModalComponent,
    PendingUsersModalComponent
  ],
})
export class MainPageModule {}
