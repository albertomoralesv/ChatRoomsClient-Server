import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket | null = null;

  constructor() {}

  connect(serverAddress: string) {
    if(this.socket==null){
      this.socket = new WebSocket(serverAddress);

      this.socket.onopen = () => {
        console.log('WebSocket connection established.');
        // You can perform any necessary actions upon connection.
      };

      this.socket.onmessage = (event) => {
        // Handle incoming WebSocket messages from the server.
        const message = JSON.parse(event.data);
        console.log('Received message:', message);
        // Update your UI or perform actions based on the received message.
      };

      this.socket.onclose = (event) => {
        console.log('WebSocket connection closed:', event);
        // Perform any necessary cleanup or handle the closure event.
        this.socket = null;
      };
    }
  }

  sendMessage(message: string) {
    if(this.socket != null){
      // Send a message to the server via WebSocket.
      this.socket!.send(message);
    }else{
      console.log("Can not send message, webSocket offline");
    }
  }
}
