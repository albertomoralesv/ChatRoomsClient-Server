import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpRequestsService } from '../http-requests.service';

@Component({
  selector: 'app-socket-address-input-field',
  templateUrl: './socket-address-input-field.component.html',
  styleUrls: ['./socket-address-input-field.component.scss'],
})
export class SocketAddressInputFieldComponent  implements OnInit {
  @Output() socketAddressInput = new EventEmitter<string>();
  socketAddress: string = '';

  constructor(private httpRequestsService: HttpRequestsService) {
    this.socketAddress = this.httpRequestsService.getSocketAddress();
  }

  ngOnInit() {}

  emit(){
    this.socketAddressInput.emit(this.socketAddress);
  }

}
