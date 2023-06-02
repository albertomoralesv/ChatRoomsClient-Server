import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpRequestsService } from '../http-requests.service';

@Component({
  selector: 'app-node-address-input-field',
  templateUrl: './node-address-input-field.component.html',
  styleUrls: ['./node-address-input-field.component.scss'],
})
export class NodeAddressInputFieldComponent  implements OnInit {
  @Output() nodeAddressInput = new EventEmitter<string>();
  nodeAddress: string = '';

  constructor(private httpRequestsService: HttpRequestsService) {
    this.nodeAddress = this.httpRequestsService.getNodeAddress();
  }

  ngOnInit() {}

  emit(){
    this.nodeAddressInput.emit(this.nodeAddress);
  }
}
