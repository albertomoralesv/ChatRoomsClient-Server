import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpRequestsService } from '../http-requests.service';

@Component({
  selector: 'app-node-port-input-field',
  templateUrl: './node-port-input-field.component.html',
  styleUrls: ['./node-port-input-field.component.scss'],
})
export class NodePortInputFieldComponent  implements OnInit {
  @Output() nodePortInput = new EventEmitter<string>();
  nodePort: string = '';

  constructor(private httpRequestsService: HttpRequestsService) {
    this.nodePort = this.httpRequestsService.getNodePort();
  }

  ngOnInit() {}

  emit(){
    this.nodePortInput.emit(this.nodePort);
  }

}
