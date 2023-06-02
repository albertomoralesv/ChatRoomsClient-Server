import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, delay, finalize, map, of } from 'rxjs';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {
  private nodeServerActiveSubject = new BehaviorSubject<boolean>(false);
  private socketServerActiveSubject = new BehaviorSubject<boolean>(false);

  nodeServerActive$: Observable<boolean> = this.nodeServerActiveSubject.asObservable();
  socketServerActive$: Observable<boolean> = this.socketServerActiveSubject.asObservable();

  // Getter methods to access the current values
  get nodeServerActive(): boolean {
    return this.nodeServerActiveSubject.value;
  }

  get socketServerActive(): boolean {
    return this.socketServerActiveSubject.value;
  }

  // Setter methods to update the values
  set nodeServerActive(value: boolean) {
    this.nodeServerActiveSubject.next(value);
  }

  set socketServerActive(value: boolean) {
    this.socketServerActiveSubject.next(value);
  }

  nodeAddress: string = this.getNodeAddress();
  nodePort: string = this.getNodePort();
  socketAddress: string = this.getSocketAddress();
  socketPort: string = this.getSocketPort();

  loggedUsername: string = this.getLoggedUsername();

  loggedUserGroups: string[] = [];

  allUsers: string[] = [];

  // Create a dictionary
  groupsData: MainDictionary = {};

  constructor(private http: HttpClient, private webSocketService: WebSocketService) {
    const nodeServer = localStorage.getItem('nodeAddress') && localStorage.getItem('nodeAddress') != '' && localStorage.getItem('nodePort') && localStorage.getItem('nodePort') != '';
    const socketServer = localStorage.getItem('socketAddress') && localStorage.getItem('socketAddress') != '' && localStorage.getItem('socketPort') && localStorage.getItem('socketPort') != '';
    if(nodeServer && socketServer){
      this.testBothServers2(localStorage.getItem('nodeAddress')!, localStorage.getItem('nodePort')!, localStorage.getItem('socketAddress')!, localStorage.getItem('socketPort')!);
    }
  }

  private getData(address: string): Observable<any> {
    return this.http.get(address).pipe(
      map(data => {
        return data; // Return the data if successful
      }),
      catchError(error => {
        console.log(error);
        return of('error'); // Return a new observable that emits the string 'error'
      })
    );
  }

  private postD(address: string, data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        contentType: 'application/json'
      })
    };
    return this.http.post<any>(address, data, httpOptions);
  }

  private postData(address: string, data: any): Observable<any> {
    return this.postD(address, data).pipe(
      map(data => {
        console.log(data);
        return data; // Return the data if successful
      }),
      catchError(error => {
        console.log(error);
        return of('error'); // Return a new observable that emits the string 'error'
      })
    );
  }

  /*private postData(address: string, data: any) {
    this.postD(address, data).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }*/

  setNodeAddress(nodeAddress: string){
    localStorage.setItem('nodeAddress', nodeAddress);
  }
  setNodePort(nodePort: string){
    localStorage.setItem('nodePort', nodePort);
  }
  setSocketAddress(socketAddress: string){
    localStorage.setItem('socketAddress', socketAddress);
  }
  setSocketPort(socketPort: string){
    localStorage.setItem('socketPort', socketPort);
  }
  getNodeAddress(): string{
    if(localStorage.getItem('nodeAddress')){
      return localStorage.getItem('nodeAddress')!;
    }else{
      return '';
    }
  }
  getNodePort(): string{
    if(localStorage.getItem('nodePort')){
      return localStorage.getItem('nodePort')!;
    }else{
      return '';
    }
  }
  getSocketAddress(): string{
    if(localStorage.getItem('socketAddress')){
      return localStorage.getItem('socketAddress')!;
    }else{
      return '';
    }
  }
  getSocketPort(): string{
    if(localStorage.getItem('socketPort')){
      return localStorage.getItem('socketPort')!;
    }else{
      return '';
    }
  }

  setLoggedUsername(username: string){
    localStorage.setItem('loggedUsername', username);
  }
  getLoggedUsername(){
    if(localStorage.getItem('loggedUsername')){
      return localStorage.getItem('loggedUsername')!;
    }else{
      return '';
    }
  }
  /*
  prevServerConfig(){
    const nodeServer = localStorage.getItem('nodeAddress') && localStorage.getItem('nodeAddress') != '' && localStorage.getItem('nodePort') && localStorage.getItem('nodePort') != '';
    const socketServer = localStorage.getItem('socketAddress') && localStorage.getItem('socketAddress') != '' && localStorage.getItem('socketPort') && localStorage.getItem('socketPort') != '';
    if(nodeServer && socketServer){
      this.testServer(localStorage.getItem('nodeAddress')!, localStorage.getItem('nodePort')!, localStorage.getItem('socketAddress')!, localStorage.getItem('socketPort')!);
    }
  }*/

  logout(){
    this.loggedUsername = '';
    this.setLoggedUsername('');
    this.loggedUserGroups = [];
    this.groupsData = {};
  }

  testServer2(nodeAddress: string, nodePort: string){
    const fullAddress: string = 'http://'+nodeAddress+':'+nodePort+'/test';
    const wsAddress: string = 'ws://'+nodeAddress+':'+nodePort+'/test';
    this.getData(fullAddress).subscribe(
      data => {
        if(data != 'error'){
          this.nodeServerActive = true;
          this.webSocketService.connect(wsAddress);
          console.log("Server Active");
        }else{
          this.nodeServerActive = false;
          console.log("Server disconnected");
        }

      },
    );
    console.log("End Test");
  }

  testServer(nodeAddress: string, nodePort: string): Observable<any> {
    const fullAddress: string = 'http://' + nodeAddress + ':' + nodePort + '/test';
    const wsAddress: string = 'ws://' + nodeAddress + ':' + nodePort + '/test';
    return this.getData(fullAddress).pipe(
      map(data => {
        if (data !== 'error') {
          this.nodeServerActive = true;
          this.webSocketService.connect(wsAddress);
          console.log("Server Active");
        } else {
          this.nodeServerActive = false;
          console.log("Server disconnected");
        }
        return data;
      }),
      catchError(error => {
        // Handle error if needed
        return of('error');
      })
    );
  }

  testBothServers2(nodeAddress: string, nodePort: string, socketAddress: string, socketPort: string){
    const url = 'http://' + nodeAddress + ':' + nodePort + '/test';
    const wsUrl = 'ws://' + nodeAddress + ':' + nodePort + '/test';
    const requestData = {
      socketAddress: socketAddress,
      socketPort: socketPort
    };
    this.postData(url, requestData).subscribe(
      data => {
        if(data != 'error'){
          this.nodeServerActive = true;
          this.webSocketService.connect(wsUrl);
          this.nodeAddress = nodeAddress;
          this.nodePort = nodePort;
          if(data.status){
            this.socketAddress = socketAddress;
            this.socketPort = socketPort;
            this.socketServerActive = true;
            this.getUserGroups().subscribe(status => {
              console.log('Status:', status);
              // Continue with further processing or actions based on the status value
            }, error => {
              console.error('Error:', error);
              // Handle the error if needed
            });
          }else{
            this.socketAddress = '';
            this.socketPort = '';
            this.socketServerActive = false;
          }
          console.log("Server Active");
        }else{
          this.nodeAddress = '';
          this.nodePort = '';
          this.nodeServerActive = false;
          this.socketAddress = '';
          this.socketPort = '';
          this.socketServerActive = false;
          console.log("Error server disconnected");
        }

      },
    );
    console.log("End Test");
  }

  testBothServers(nodeAddress: string, nodePort: string, socketAddress: string, socketPort: string): Observable<any> {
    const url = 'http://' + nodeAddress + ':' + nodePort + '/test';
    const wsUrl = 'ws://' + nodeAddress + ':' + nodePort + '/test';
    const requestData = {
      socketAddress: socketAddress,
      socketPort: socketPort
    };
    return this.postData(url, requestData).pipe(
      map(data => {
        if (data !== 'error') {
          //this.serverActive = true;
          console.log(data);
          this.nodeAddress = nodeAddress;
          this.nodePort = nodePort;
          this.nodeServerActive = true;
          this.webSocketService.connect(wsUrl);
          if(data.status){
            this.socketAddress = socketAddress;
            this.socketPort = socketPort;
            this.socketServerActive = true;
          }else{
            this.socketAddress = '';
            this.socketPort = '';
            this.socketServerActive = false;
          }
          console.log("Server Active");
        } else {
          this.nodeAddress = '';
          this.nodePort = '';
          this.nodeServerActive = false;
          this.socketAddress = '';
          this.socketPort = '';
          this.socketServerActive = false;
          console.log("Server disconnected");
        }
        return data;
      }),
      catchError(error => {
        // Handle error if needed
        //
        this.nodeAddress = '';
        this.nodePort = '';
        this.nodeServerActive = false;
        this.socketAddress = '';
        this.socketPort = '';
        this.socketServerActive = false;
        //
        return of('error');
      })
    );
  }

  makeTest(): Observable<void> {
    const nodeServer = localStorage.getItem('nodeAddress') && localStorage.getItem('nodeAddress') != '' && localStorage.getItem('nodePort') && localStorage.getItem('nodePort') != '';
    const socketServer = localStorage.getItem('socketAddress') && localStorage.getItem('socketAddress') != '' && localStorage.getItem('socketPort') && localStorage.getItem('socketPort') != '';

    if (nodeServer && socketServer) {
      return this.testBothServers(localStorage.getItem('nodeAddress')!, localStorage.getItem('nodePort')!, localStorage.getItem('socketAddress')!, localStorage.getItem('socketPort')!).pipe(
        delay(0), // Add a delay to ensure async behavior
        finalize(() => {
          // Perform any cleanup or finalization logic here
        })
      );
    } else {
      return of();
    }
  }

  login(username: string, password: string): Observable<any> {
    const nodeAddress = this.nodeAddress;
    const nodePort = this.nodePort;
    const socketAddress = this.socketAddress;
    const socketPort = this.socketPort;
    const url = 'http://' + nodeAddress + ':' + nodePort + '/login';
    const requestData = {
      socketAddress: socketAddress,
      socketPort: socketPort,
      username: username,
      password: password
    };
    return this.postData(url, requestData).pipe(
      map(data => {
        if (data !== 'error') {
          data = data.status;
          if(data){
            this.loggedUsername = username;
            this.setLoggedUsername(username);
          }
        } else {
          this.makeTest();
          data = false;
          console.log("error connecting to node");
        }
        return data;
      }),
      catchError(error => {
        // Handle error if needed
        this.makeTest();
        console.log('can not connect to socket');
        return of('error');
      })
    );
  }

  register(username: string, password: string): Observable<any> {
    const nodeAddress = this.nodeAddress;
    const nodePort = this.nodePort;
    const socketAddress = this.socketAddress;
    const socketPort = this.socketPort;
    const url = 'http://' + nodeAddress + ':' + nodePort + '/register';
    const requestData = {
      socketAddress: socketAddress,
      socketPort: socketPort,
      username: username,
      password: password
    };
    return this.postData(url, requestData).pipe(
      map(data => {
        if (data !== 'error') {
          data = data.status;
          if(data){
            this.loggedUsername = username;
            this.setLoggedUsername(username);
          }
        } else {
          this.makeTest();
          data = false;
          console.log("error connecting to node");
        }
        return data;
      }),
      catchError(error => {
        // Handle error if needed
        this.makeTest();
        console.log('can not connect to socket');
        return of('error');
      })
    );
  }

  createGroup(groupName: string): Observable<any> {
    const nodeAddress = this.nodeAddress;
    const nodePort = this.nodePort;
    const socketAddress = this.socketAddress;
    const socketPort = this.socketPort;
    const url = 'http://' + nodeAddress + ':' + nodePort + '/createGroup';
    const username = this.loggedUsername;
    const requestData = {
      socketAddress: socketAddress,
      socketPort: socketPort,
      username: username,
      groupName: groupName
    };
    return this.postData(url, requestData).pipe(
      map(data => {
        if (data !== 'error') {
          data = data.status;
          if(data){
            this.groupsData[groupName] = {'users': [], 'pending': [], 'conv': []};
          }
        } else {
          this.makeTest();
          data = false;
          console.log("error connecting to node");
        }
        return data;
      }),
      catchError(error => {
        // Handle error if needed
        this.makeTest();
        console.log('can not connect to socket');
        return of('error');
      })
    );
  }

  joinGroup(groupName: string): Observable<any> {
    const nodeAddress = this.nodeAddress;
    const nodePort = this.nodePort;
    const socketAddress = this.socketAddress;
    const socketPort = this.socketPort;
    const url = 'http://' + nodeAddress + ':' + nodePort + '/joinGroup';
    const username = this.loggedUsername;
    const requestData = {
      socketAddress: socketAddress,
      socketPort: socketPort,
      username: username,
      groupName: groupName
    };
    return this.postData(url, requestData).pipe(
      map(data => {
        if (data !== 'error') {
        } else {
          this.makeTest();
          data.status = 0;
          data.message = "Server Offline";
          console.log("error connecting to node");
        }
        return data;
      }),
      catchError(error => {
        // Handle error if needed
        this.makeTest();
        console.log('can not connect to socket');
        return of('error');
      })
    );
  }

  getUserGroups(): Observable<any> {
    const nodeAddress = this.nodeAddress;
    const nodePort = this.nodePort;
    const socketAddress = this.socketAddress;
    const socketPort = this.socketPort;
    const url = 'http://' + nodeAddress + ':' + nodePort + '/getUserGroups';
    const username = this.loggedUsername;
    const requestData = {
      socketAddress: socketAddress,
      socketPort: socketPort,
      username: username,
    };
    return this.postData(url, requestData).pipe(
      map(data => {
        if (data !== 'error') {
          if(data.groups!=''){
            this.loggedUserGroups = [];
            const lines = data.groups.split('\n');
            for (const currentGroup of lines) {
              if(currentGroup != ''){
                this.loggedUserGroups.push(currentGroup);
                this.groupsData[currentGroup] = {'users': [], 'pending': [], 'conv': []};
              }
            }
            console.log(lines);
          }
        } else {
          this.makeTest();
          data.status = 0;
          data.message = "Server Offline";
          console.log("error connecting to node");
        }
        return data.status;
      }),
      catchError(error => {
        // Handle error if needed
        this.makeTest();
        console.log('can not connect to socket');
        return of('error');
      })
    );
  }
  getGroupUsers(groupName: string): Observable<any> {
    const nodeAddress = this.nodeAddress;
    const nodePort = this.nodePort;
    const socketAddress = this.socketAddress;
    const socketPort = this.socketPort;
    const url = 'http://' + nodeAddress + ':' + nodePort + '/getGroupUsers';
    const requestData = {
      socketAddress: socketAddress,
      socketPort: socketPort,
      groupName: groupName
    };
    return this.postData(url, requestData).pipe(
      map(data => {
        if (data !== 'error') {
          if(data.users!=''){
            this.groupsData[groupName]['users'] = [];
            const lines = data.users.split('\n');
            let cont = 0;
            let userName: string = '';
            let userRole: string = '';
            let fullUser: GroupUser;
            let newArray: GroupUser[] = [];
            for (const userInfo of lines) {
              if(lines!==''){
                if(cont%2==0){
                  userName = userInfo;
                }else{
                  userRole = userInfo;
                  fullUser = {
                    username: userName,
                    role: userRole,
                  }
                  newArray.push(fullUser);
                  this.groupsData[groupName]['users'].push(fullUser);
                }
                cont++;
              }
            }
            console.log(lines);
          }
        } else {
          this.makeTest();
          data.status = 0;
          data.message = "Server Offline";
          console.log("error connecting to node");
        }
        return data.status;
      }),
      catchError(error => {
        // Handle error if needed
        this.makeTest();
        console.log('can not connect to socket');
        return of('error');
      })
    );
  }
  getGroupPending(groupName: string): Observable<any> {
    const nodeAddress = this.nodeAddress;
    const nodePort = this.nodePort;
    const socketAddress = this.socketAddress;
    const socketPort = this.socketPort;
    const url = 'http://' + nodeAddress + ':' + nodePort + '/getGroupPending';
    const requestData = {
      socketAddress: socketAddress,
      socketPort: socketPort,
      groupName: groupName
    };
    return this.postData(url, requestData).pipe(
      map(data => {
        if (data !== 'error') {
          if(data.users!=''){
            this.groupsData[groupName]['pending'] = [];
            const lines = data.users.split('\n');
            for (const userInfo of lines) {
              if(userInfo!==''){
                this.groupsData[groupName]['pending'].push(userInfo);
              }
            }
            console.log(lines);
          }
        } else {
          this.makeTest();
          data.status = 0;
          data.message = "Server Offline";
          console.log("error connecting to node");
        }
        return data.status;
      }),
      catchError(error => {
        // Handle error if needed
        this.makeTest();
        console.log('can not connect to socket');
        return of('error');
      })
    );
  }
  getGroupConv(groupName: string): Observable<any> {
    const nodeAddress = this.nodeAddress;
    const nodePort = this.nodePort;
    const socketAddress = this.socketAddress;
    const socketPort = this.socketPort;
    const url = 'http://' + nodeAddress + ':' + nodePort + '/getGroupConv';
    const requestData = {
      socketAddress: socketAddress,
      socketPort: socketPort,
      groupName: groupName
    };
    return this.postData(url, requestData).pipe(
      map(data => {
        if (data !== 'error') {
          if(data.messages!=''){
            this.groupsData[groupName]['conv'] = [];
            const lines = data.messages.split('\n');
            let cont = 0;
            let mssgSender: string = '';
            let mssgContent: string = '';
            let fullMessage: GroupMessage;
            let newArray: GroupMessage[] = [];
            for (const messageInfo of lines) {
              if(cont%2==0){
                mssgSender = messageInfo;
              }else{
                mssgContent = messageInfo;
                fullMessage = {
                  sender: mssgSender,
                  content: mssgContent,
                }
                newArray.push(fullMessage);
                this.groupsData[groupName]['conv'].push(fullMessage);
              }
              cont++;
            }
            console.log(lines);
          }
        } else {
          this.makeTest();
          data.status = 0;
          data.message = "Server Offline";
          console.log("error connecting to node");
        }
        return data.status;
      }),
      catchError(error => {
        // Handle error if needed
        this.makeTest();
        console.log('can not connect to socket');
        return of('error');
      })
    );
  }
  sendMessage(groupName: string, message: string): Observable<any> {
    const message2 = message.replace(/\n/g, ' ');
    const nodeAddress = this.nodeAddress;
    const nodePort = this.nodePort;
    const socketAddress = this.socketAddress;
    const socketPort = this.socketPort;
    const username = this.loggedUsername;
    const url = 'http://' + nodeAddress + ':' + nodePort + '/sendMessage';
    const requestData = {
      socketAddress: socketAddress,
      socketPort: socketPort,
      username: username,
      groupName: groupName,
      message: message2
    };
    return this.postData(url, requestData).pipe(
      map(data => {
        if (data !== 'error') {
          if(data.status){
            const currentMssg: GroupMessage = {
              sender: username,
              content: message
            }
            this.groupsData[groupName]['conv'].push(currentMssg);
          }
        } else {
          this.makeTest();
          data.status = 0;
          data.message = "Server Offline";
          console.log("error connecting to node");
        }
        return data.status;
      }),
      catchError(error => {
        // Handle error if needed
        this.makeTest();
        console.log(error);
        console.log('can not connect to socket');
        return of('error');
      })
    );
  }
  addUserToGroup(newUser: string, groupName: string){
    const nodeAddress = this.nodeAddress;
    const nodePort = this.nodePort;
    const socketAddress = this.socketAddress;
    const socketPort = this.socketPort;
    const adminUser = this.loggedUsername;
    const url = 'http://' + nodeAddress + ':' + nodePort + '/addUser';
    const requestData = {
      socketAddress: socketAddress,
      socketPort: socketPort,
      adminUsername: adminUser,
      newUsername: newUser,
      groupName: groupName
    };
    return this.postData(url, requestData).pipe(
      map(data => {
        if (data !== 'error') {
          if(data.status){
            const currentMssg: GroupMessage = {
              sender: 'Admin',
              content: adminUser+' added user: '+newUser
            }
            const newGroupUser: GroupUser = {
              username: newUser,
              role: '0'
            }
            this.groupsData[groupName]['users'].push(newGroupUser);
            this.groupsData[groupName]['conv'].push(currentMssg);
            console.log("added");
          }
        } else {
          this.makeTest();
          data.status = 0;
          data.message = "Server Offline";
          console.log("error connecting to node");
        }
        return data.status;
      }),
      catchError(error => {
        // Handle error if needed
        this.makeTest();
        console.log(error);
        console.log('can not connect to socket');
        return of('error');
      })
    );
  }
  acceptJoinRequest(newUser: string, groupName: string){
    const nodeAddress = this.nodeAddress;
    const nodePort = this.nodePort;
    const socketAddress = this.socketAddress;
    const socketPort = this.socketPort;
    const adminUser = this.loggedUsername;
    const url = 'http://' + nodeAddress + ':' + nodePort + '/acceptJoinRequest';
    const requestData = {
      socketAddress: socketAddress,
      socketPort: socketPort,
      adminUsername: adminUser,
      newUsername: newUser,
      groupName: groupName
    };
    return this.postData(url, requestData).pipe(
      map(data => {
        if (data !== 'error') {
          if(data.status){
            const currentMssg: GroupMessage = {
              sender: 'Admin',
              content: adminUser+' added user: '+newUser
            }
            const newGroupUser: GroupUser = {
              username: newUser,
              role: '0'
            }
            this.groupsData[groupName]['users'].push(newGroupUser);
            this.groupsData[groupName]['conv'].push(currentMssg);
            const pendingUsers = this.groupsData[groupName]['pending'];
            for (let i = 0; i < pendingUsers.length; i++) {
              const value = pendingUsers[i];

              if (typeof value === 'string') {
                if (value === newUser) {
                  pendingUsers.splice(i, 1); // Remove the element at index i
                  i--; // Decrement i to account for the removed element
                  break;
                }
              }
            }
            console.log("added");
          }
        } else {
          this.makeTest();
          data.status = 0;
          data.message = "Server Offline";
          console.log("error connecting to node");
        }
        return data.status;
      }),
      catchError(error => {
        // Handle error if needed
        this.makeTest();
        console.log(error);
        console.log('can not connect to socket');
        return of('error');
      })
    );
  }
  rejectJoinRequest(newUser: string, groupName: string){
    const nodeAddress = this.nodeAddress;
    const nodePort = this.nodePort;
    const socketAddress = this.socketAddress;
    const socketPort = this.socketPort;
    const adminUser = this.loggedUsername;
    const url = 'http://' + nodeAddress + ':' + nodePort + '/rejectJoinRequest';
    const requestData = {
      socketAddress: socketAddress,
      socketPort: socketPort,
      adminUsername: adminUser,
      newUsername: newUser,
      groupName: groupName
    };
    return this.postData(url, requestData).pipe(
      map(data => {
        if (data !== 'error') {
          if(data.status){
            const pendingUsers = this.groupsData[groupName]['pending'];
            for (let i = 0; i < pendingUsers.length; i++) {
              const value = pendingUsers[i];

              if (typeof value === 'string') {
                if (value === newUser) {
                  pendingUsers.splice(i, 1); // Remove the element at index i
                  i--; // Decrement i to account for the removed element
                  break;
                }
              }
            }
            console.log("rejected");
          }
        } else {
          this.makeTest();
          data.status = 0;
          data.message = "Server Offline";
          console.log("error connecting to node");
        }
        return data.status;
      }),
      catchError(error => {
        // Handle error if needed
        this.makeTest();
        console.log(error);
        console.log('can not connect to socket');
        return of('error');
      })
    );
  }
  getUsers(): Observable<any> {
    const nodeAddress = this.nodeAddress;
    const nodePort = this.nodePort;
    const socketAddress = this.socketAddress;
    const socketPort = this.socketPort;
    const url = 'http://' + nodeAddress + ':' + nodePort + '/getUsers';
    const requestData = {
      socketAddress: socketAddress,
      socketPort: socketPort,
    };
    return this.postData(url, requestData).pipe(
      map(data => {
        if (data !== 'error') {
          if(data.users!=''){
            this.allUsers = [];
            const lines = data.users.split('\n');
            for (const username of lines) {
              if(username!==''){
                this.allUsers.push(username);
              }
            }
            console.log(lines);
          }
        } else {
          this.makeTest();
          data.status = 0;
          data.message = "Server Offline";
          console.log("error connecting to node");
        }
        return data.status;
      }),
      catchError(error => {
        // Handle error if needed
        this.makeTest();
        console.log('can not connect to socket');
        return of('error');
      })
    );
  }
}
// Define the nested dictionary interface
interface NestedDictionary {
  [key: string]: Array<string | GroupUser | GroupMessage>;
}

// Define the main dictionary interface
interface MainDictionary {
  [key: string]: NestedDictionary;
}

interface GroupMessage {
  sender: string;
  content: string;
}

interface GroupUser {
  username: string;
  role: string;
}
