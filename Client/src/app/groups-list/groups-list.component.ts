import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpRequestsService } from '../http-requests.service';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss'],
})
export class GroupsListComponent  implements OnInit {
  groups: string[];
  @Output() customEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(public httpRequestsService: HttpRequestsService) {
    this.groups = this.httpRequestsService.loggedUserGroups;
  }

  ngOnInit() {}

  groupClicked(group: string) {
    this.customEvent.emit(group);
  }

  refreshGroups(){
    this.httpRequestsService.getUserGroups().subscribe(status => {
      console.log('Status:', status);
      this.groups = this.httpRequestsService.loggedUserGroups;
      // Continue with further processing or actions based on the status value
    }, error => {
      console.error('Error:', error);
      // Handle the error if needed
    });
  }

}
