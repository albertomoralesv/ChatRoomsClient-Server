import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpRequestsService } from '../http-requests.service';

@Component({
  selector: 'app-socket-port-input-field',
  templateUrl: './socket-port-input-field.component.html',
  styleUrls: ['./socket-port-input-field.component.scss'],
})
export class SocketPortInputFieldComponent  implements OnInit {
  @Output() socketPortInput = new EventEmitter<string>();
  socketPort: string = '';

  constructor(private httpRequestsService: HttpRequestsService) {
    this.socketPort = this.httpRequestsService.getSocketPort();
  }

  ngOnInit() {}

  emit(){
    this.socketPortInput.emit(this.socketPort);
  }

}
