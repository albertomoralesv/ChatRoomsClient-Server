console.log("Node Server Start");

function encryptString(text) {
   const substitutionMap = {
     'a': 'z',
     'b': 'y',
     'c': 'x',
     'd': 'w',
     'e': 'v',
     'f': 'u',
     'g': 't',
     'h': 's',
     'i': 'r',
     'j': 'q',
     'k': 'p',
     'l': 'o',
     'm': 'n',
     'n': 'm',
     'o': 'l',
     'p': 'k',
     'q': 'j',
     'r': 'i',
     's': 'h',
     't': 'g',
     'u': 'f',
     'v': 'e',
     'w': 'd',
     'x': 'c',
     'y': 'b',
     'z': 'a',
     ' ': '_'
   };
 
   let encryptedText = '';
   for (let i = 0; i < text.length; i++) {
     const char = text[i];
     const substitution = substitutionMap[char] || char;
     encryptedText += substitution;
   }
 
   return encryptedText;
}
  
const net = require('net');
const http = require('http');
const express = require('express');
const cors = require('cors');

// Function to send data to the C server
function testSocketServer(socketAddress, socketPort) {
   return new Promise((resolve, reject) => {
      // Create a new socket connection to the C server
      const client = new net.Socket();
      let connectionStatus = 0;
   
      // Connect to the C server
      client.connect(socketPort, socketAddress, () => {
         // Connection to C server established
         console.log('Connected to C server');

         // Send the data to the C server
         client.write('test');
      });

      // Handle data received from the server
      client.on('data', (data) => {
         console.log('Received data from server:', data.toString());
         connectionStatus = 1;
         client.end();
         resolve(connectionStatus); // Resolve the Promise with 1 (success)
      });
   
      // Handle connection error
      client.on('error', (error) => {
         console.error('Error connecting to C server:', error);
         // Close the socket connection
         client.destroy();
         // Reject the Promise with the error
         //reject(error);
         resolve(0);
      });

      // Handle connection close
      client.on('close', (error) => {
         if (error) {
            console.error('5 Connection to C server closed due to an error');
            // Handle the error appropriately
            //reject(new Error('Connection error'));
            resolve(connectionStatus);
         } else {
            console.log('Connection to C server closed');
            // Clean up any resources or perform necessary actions
            resolve(connectionStatus); // Resolve the Promise with 1 (success)
         }
      });

   });
}

// Function to send login data to the C server
function tryLogin(socketAddress, socketPort, username, password) {
   return new Promise((resolve, reject) => {
      // Create a new socket connection to the C server
      const client = new net.Socket();
      let loginStatus = 0;
   
      // Connect to the C server
      client.connect(socketPort, socketAddress, () => {
         // Connection to C server established
         console.log('Connected to C server (login)');

         // Send the data to the C server
         client.write('login\n'+username+'\n'+password);
      });

      // Handle data received from the server
      client.on('data', (data) => {
         console.log('Received data from server:', data.toString());
         if(data.toString() === '1'){
            loginStatus = 1;
         }else{
            loginStatus = 0;
         } 
         client.end();
         resolve(loginStatus); // Resolve the Promise with 1 (success)
      });
   
      // Handle connection error
      client.on('error', (error) => {
         console.error('Error connecting to C server:', error);
         // Close the socket connection
         client.destroy();
         // Reject the Promise with the error
         reject(error);
      });

      // Handle connection close
      client.on('close', (error) => {
         if (error) {
            console.error('4 Connection to C server closed due to an error');
            // Handle the error appropriately
            reject(new Error('Connection error'));
         } else {
            console.log('Connection to C server closed');
            // Clean up any resources or perform necessary actions
            resolve(loginStatus); // Resolve the Promise with 1 (success)
         }
      });

   });
}

// Function to send register data to the C server
function tryRegister(socketAddress, socketPort, username, password) {
   return new Promise((resolve, reject) => {
      // Create a new socket connection to the C server
      const client = new net.Socket();
      let registerStatus = 0;
   
      // Connect to the C server
      client.connect(socketPort, socketAddress, () => {
         // Connection to C server established
         console.log('Connected to C server (Register)');

         // Send the data to the C server
         client.write('register\n'+username+'\n'+password);
      });

      // Handle data received from the server
      client.on('data', (data) => {
         console.log('Received data from server:', data.toString());
         if(data.toString() === '1'){
            registerStatus = 1;
         }else{
            registerStatus = 0;
         } 
         client.end();
         resolve(registerStatus); // Resolve the Promise with 1 (success)
      });
   
      // Handle connection error
      client.on('error', (error) => {
         console.error('Error connecting to C server:', error);
         // Close the socket connection
         client.destroy();
         // Reject the Promise with the error
         reject(error);
      });

      // Handle connection close
      client.on('close', (error) => {
         if (error) {
            console.error('3 Connection to C server closed due to an error');
            // Handle the error appropriately
            reject(new Error('Connection error'));
         } else {
            console.log('Connection to C server closed');
            // Clean up any resources or perform necessary actions
            resolve(registerStatus); // Resolve the Promise with 1 (success)
         }
      });

   });
}

// Function to send create group data to the C server
function tryCreateGroup(socketAddress, socketPort, username, groupName) {
   return new Promise((resolve, reject) => {
      // Create a new socket connection to the C server
      const client = new net.Socket();
      let createdGroup = 0;
   
      // Connect to the C server
      client.connect(socketPort, socketAddress, () => {
         // Connection to C server established
         console.log('Connected to C server (create)');

         // Send the data to the C server
         client.write('create\n'+groupName+'\n'+username);
      });

      // Handle data received from the server
      client.on('data', (data) => {
         console.log('Received data from server:', data.toString());
         if(data.toString() === '1'){
            createdGroup = 1;
         }else{
            createdGroup = 0;
         } 
         client.end();
         resolve(createdGroup); // Resolve the Promise with 1 (success)
      });
   
      // Handle connection error
      client.on('error', (error) => {
         console.error('Error connecting to C server:', error);
         // Close the socket connection
         client.destroy();
         // Reject the Promise with the error
         reject(error);
      });

      // Handle connection close
      client.on('close', (error) => {
         if (error) {
            console.error('2 Connection to C server closed due to an error');
            // Handle the error appropriately
            reject(new Error('Connection error'));
         } else {
            console.log('Connection to C server closed');
            // Clean up any resources or perform necessary actions
            resolve(createdGroup); // Resolve the Promise with 1 (success)
         }
      });

   });
}

// Function to send join group data to the C server
function tryJoinGroup(socketAddress, socketPort, username, groupName) {
   return new Promise((resolve, reject) => {
      // Create a new socket connection to the C server
      const client = new net.Socket();
      let groupJoined = 0;
   
      // Connect to the C server
      client.connect(socketPort, socketAddress, () => {
         // Connection to C server established
         console.log('Connected to C server (join)');

         // Send the data to the C server
         client.write('join\n'+groupName+'\n'+username);
      });

      // Handle data received from the server
      client.on('data', (data) => {
         console.log('Received data from server:', data.toString());
         if(data.toString() === '1'){
            groupJoined = 1;
         }else{
            groupJoined = parseInt(data.toString());
         } 
         client.end();
         resolve(groupJoined); // Resolve the Promise with 1 (success)
      });
   
      // Handle connection error
      client.on('error', (error) => {
         console.error('Error connecting to C server:', error);
         // Close the socket connection
         client.destroy();
         // Reject the Promise with the error
         reject(error);
      });

      // Handle connection close
      client.on('close', (error) => {
         if (error) {
            console.error('1 Connection to C server closed due to an error');
            // Handle the error appropriately
            reject(new Error('Connection error'));
         } else {
            console.log('Connection to C server closed');
            // Clean up any resources or perform necessary actions
            resolve(groupJoined); // Resolve the Promise with 1 (success)
         }
      });

   });
}

// Function to get the user groups from the c server
function tryGetUserGroups(socketAddress, socketPort, username) {
   return new Promise((resolve, reject) => {
      // Create a new socket connection to the C server
      const client = new net.Socket();
      let groups = '';

   
      // Connect to the C server
      client.connect(socketPort, socketAddress, () => {
         // Connection to C server established
         console.log('Connected to C server (Get User Groups)');

         // Send the data to the C server
         client.write('getUserGroups\n'+username);
      });

      // Handle data received from the server
      client.on('data', (data) => {
         console.log('Received data from server:', data.toString());
         groups = data.toString();
         client.end();
         resolve(groups); // Resolve the Promise with 1 (success)
      });
   
      // Handle connection error
      client.on('error', (error) => {
         console.error('Error connecting to C server:', error);
         // Close the socket connection
         client.destroy();
         // Reject the Promise with the error
         reject(error);
      });

      // Handle connection close
      client.on('close', (error) => {
         if (error) {
            console.error('1 Connection to C server closed due to an error');
            // Handle the error appropriately
            reject(new Error('Connection error'));
         } else {
            console.log('Connection to C server closed');
            // Clean up any resources or perform necessary actions
            resolve(groups); // Resolve the Promise with 1 (success)
         }
      });

   });
}
// Function to get the group users from the c server
function tryGetGroupUsers(socketAddress, socketPort, groupName) {
   return new Promise((resolve, reject) => {
      // Create a new socket connection to the C server
      const client = new net.Socket();
      let users = '';

   
      // Connect to the C server
      client.connect(socketPort, socketAddress, () => {
         // Connection to C server established
         console.log('Connected to C server (Get Group Users)');

         // Send the data to the C server
         client.write('getGroupUsers\n'+groupName);
      });

      // Handle data received from the server
      client.on('data', (data) => {
         console.log('Received data from server:', data.toString());
         users = data.toString();
         if(data.toString()=='NA'){
            users = '';
         }
         client.end();
         resolve(users); // Resolve the Promise with 1 (success)
      });
   
      // Handle connection error
      client.on('error', (error) => {
         console.error('Error connecting to C server:', error);
         // Close the socket connection
         client.destroy();
         // Reject the Promise with the error
         reject(error);
      });

      // Handle connection close
      client.on('close', (error) => {
         if (error) {
            console.error('1 Connection to C server closed due to an error');
            // Handle the error appropriately
            reject(new Error('Connection error'));
         } else {
            console.log('Connection to C server closed');
            // Clean up any resources or perform necessary actions
            resolve(users); // Resolve the Promise with 1 (success)
         }
      });
   });
}
// Function to get the group pending users from the c server
function tryGetGroupPending(socketAddress, socketPort, groupName) {
   return new Promise((resolve, reject) => {
      // Create a new socket connection to the C server
      const client = new net.Socket();
      let users = '';

   
      // Connect to the C server
      client.connect(socketPort, socketAddress, () => {
         // Connection to C server established
         console.log('Connected to C server (Get Group Pending)');

         // Send the data to the C server
         client.write('getGroupPending\n'+groupName);
      });

      // Handle data received from the server
      client.on('data', (data) => {
         console.log('Received data from server:', data.toString());
         users = data.toString();
         if(data.toString()=='NA'){
            users = '';
         }
         client.end();
         resolve(users); // Resolve the Promise with 1 (success)
      });
   
      // Handle connection error
      client.on('error', (error) => {
         console.error('Error connecting to C server:', error);
         // Close the socket connection
         client.destroy();
         // Reject the Promise with the error
         reject(error);
      });

      // Handle connection close
      client.on('close', (error) => {
         if (error) {
            console.error('1 Connection to C server closed due to an error');
            // Handle the error appropriately
            reject(new Error('Connection error'));
         } else {
            console.log('Connection to C server closed');
            // Clean up any resources or perform necessary actions
            resolve(users); // Resolve the Promise with 1 (success)
         }
      });
   });
}
// Function to get the group conversation from the c server
function tryGetGroupConv(socketAddress, socketPort, groupName) {
   return new Promise((resolve, reject) => {
      // Create a new socket connection to the C server
      const client = new net.Socket();
      let messages = '';

   
      // Connect to the C server
      client.connect(socketPort, socketAddress, () => {
         // Connection to C server established
         console.log('Connected to C server (Get Group Conv)');

         // Send the data to the C server
         client.write('getGroupConv\n'+groupName);
         console.log("write");
      });

      // Handle data received from the server
      client.on('data', (data) => {
         console.log('Received data from server:', data.toString());
         messages = data.toString();
         if(data.toString()=='NA'){
            messages = '';
         }
         client.end();
         resolve(messages); // Resolve the Promise with 1 (success)
      });
   
      // Handle connection error
      client.on('error', (error) => {
         console.error('Error connecting to C server:', error);
         // Close the socket connection
         client.destroy();
         // Reject the Promise with the error
         reject(error);
      });

      // Handle connection close
      client.on('close', (error) => {
         if (error) {
            console.error('1 Connection to C server closed due to an error');
            // Handle the error appropriately
            reject(new Error('Connection error'));
         } else {
            console.log('Connection to C server closed');
            // Clean up any resources or perform necessary actions
            resolve(messages); // Resolve the Promise with 1 (success)
         }
      });
   });
}
// Function to send a message to a group conversation
function trySendMessage(socketAddress, socketPort, username, groupName, message) {
   return new Promise((resolve, reject) => {
      // Create a new socket connection to the C server
      const client = new net.Socket();
      let messageSent = 0;

   
      // Connect to the C server
      client.connect(socketPort, socketAddress, () => {
         // Connection to C server established
         console.log('Connected to C server (Send Message)');

         // Send the data to the C server
         client.write('sendMessage\n'+username+'\n'+groupName+'\n'+message);
      });

      // Handle data received from the server
      client.on('data', (data) => {
         console.log('Received data from server:', data.toString());
         if(data.toString() === '1'){
            messageSent = 1;
         }else{
            messageSent = 0;
         } 
         client.end();
         resolve(messageSent); // Resolve the Promise with 1 (success)
      });
   
      // Handle connection error
      client.on('error', (error) => {
         console.error('Error connecting to C server:', error);
         // Close the socket connection
         client.destroy();
         // Reject the Promise with the error
         reject(error);
      });

      // Handle connection close
      client.on('close', (error) => {
         if (error) {
            console.error('1 Connection to C server closed due to an error');
            // Handle the error appropriately
            reject(new Error('Connection error'));
         } else {
            console.log('Connection to C server closed');
            // Clean up any resources or perform necessary actions
            resolve(messageSent); // Resolve the Promise with 1 (success)
         }
      });

   });   
}
// Function to add a user to a group
function tryAddUser(socketAddress, socketPort, adminUsername, newUsername, groupName) {
   return new Promise((resolve, reject) => {
      // Create a new socket connection to the C server
      const client = new net.Socket();
      let addedUser = 0;
   
      // Connect to the C server
      client.connect(socketPort, socketAddress, () => {
         // Connection to C server established
         console.log('Connected to C server (Add User to Group)');

         // Send the data to the C server
         client.write('addUser\n'+adminUsername+'\n'+newUsername+'\n'+groupName+'\n');
      });

      // Handle data received from the server
      client.on('data', (data) => {
         console.log('Received data from server:', data.toString());
         addedUser = parseInt(data.toString());
         client.end();
         resolve(addedUser); // Resolve the Promise with 1 (success)
      });
   
      // Handle connection error
      client.on('error', (error) => {
         console.error('Error connecting to C server:', error);
         // Close the socket connection
         client.destroy();
         // Reject the Promise with the error
         reject(error);
      });

      // Handle connection close
      client.on('close', (error) => {
         if (error) {
            console.error('1 Connection to C server closed due to an error');
            // Handle the error appropriately
            reject(new Error('Connection error'));
         } else {
            console.log('Connection to C server closed');
            // Clean up any resources or perform necessary actions
            resolve(addedUser); // Resolve the Promise with 1 (success)
         }
      });
   });
}
// Function to accept a join request of a user to a group
function tryAcceptJoinRequest(socketAddress, socketPort, adminUsername, newUsername, groupName) {
   return new Promise((resolve, reject) => {
      // Create a new socket connection to the C server
      const client = new net.Socket();
      let addedUser = 0;
   
      // Connect to the C server
      client.connect(socketPort, socketAddress, () => {
         // Connection to C server established
         console.log('Connected to C server (Accept Join Request User to Group)');

         // Send the data to the C server
         client.write('acceptJoinRequest\n'+adminUsername+'\n'+newUsername+'\n'+groupName+'\n');
      });

      // Handle data received from the server
      client.on('data', (data) => {
         console.log('Received data from server:', data.toString());
         addedUser = parseInt(data.toString());
         client.end();
         resolve(addedUser); // Resolve the Promise with 1 (success)
      });
   
      // Handle connection error
      client.on('error', (error) => {
         console.error('Error connecting to C server:', error);
         // Close the socket connection
         client.destroy();
         // Reject the Promise with the error
         reject(error);
      });

      // Handle connection close
      client.on('close', (error) => {
         if (error) {
            console.error('1 Connection to C server closed due to an error');
            // Handle the error appropriately
            reject(new Error('Connection error'));
         } else {
            console.log('Connection to C server closed');
            // Clean up any resources or perform necessary actions
            resolve(addedUser); // Resolve the Promise with 1 (success)
         }
      });

   });
}
// Function to reject a join request of a user to a group
function tryRejectJoinRequest(socketAddress, socketPort, adminUsername, newUsername, groupName) {
   return new Promise((resolve, reject) => {
      // Create a new socket connection to the C server
      const client = new net.Socket();
      let addedUser = 0;
   
      // Connect to the C server
      client.connect(socketPort, socketAddress, () => {
         // Connection to C server established
         console.log('Connected to C server (Reject Join Request User to Group)');

         // Send the data to the C server
         client.write('rejectJoinRequest\n'+adminUsername+'\n'+newUsername+'\n'+groupName+'\n');
      });

      // Handle data received from the server
      client.on('data', (data) => {
         console.log('Received data from server:', data.toString());
         addedUser = parseInt(data.toString());
         client.end();
         resolve(addedUser); // Resolve the Promise with 1 (success)
      });
   
      // Handle connection error
      client.on('error', (error) => {
         console.error('Error connecting to C server:', error);
         // Close the socket connection
         client.destroy();
         // Reject the Promise with the error
         reject(error);
      });

      // Handle connection close
      client.on('close', (error) => {
         if (error) {
            console.error('1 Connection to C server closed due to an error');
            // Handle the error appropriately
            reject(new Error('Connection error'));
         } else {
            console.log('Connection to C server closed');
            // Clean up any resources or perform necessary actions
            resolve(addedUser); // Resolve the Promise with 1 (success)
         }
      });

   });
}
// Function to get all users from the c server
function tryGetUsers(socketAddress, socketPort) {
   return new Promise((resolve, reject) => {
      // Create a new socket connection to the C server
      const client = new net.Socket();
      let users = '';

   
      // Connect to the C server
      client.connect(socketPort, socketAddress, () => {
         // Connection to C server established
         console.log('Connected to C server (Get Users)');

         // Send the data to the C server
         client.write('getUsers\n');
      });

      // Handle data received from the server
      client.on('data', (data) => {
         console.log('Received data from server:', data.toString());
         users = data.toString();
         if(data.toString()=='NA'){
            users = '';
         }
         client.end();
         resolve(users); // Resolve the Promise with 1 (success)
      });
   
      // Handle connection error
      client.on('error', (error) => {
         console.error('Error connecting to C server:', error);
         // Close the socket connection
         client.destroy();
         // Reject the Promise with the error
         reject(error);
      });

      // Handle connection close
      client.on('close', (error) => {
         if (error) {
            console.error('1 Connection to C server closed due to an error');
            // Handle the error appropriately
            reject(new Error('Connection error'));
         } else {
            console.log('Connection to C server closed');
            // Clean up any resources or perform necessary actions
            resolve(users); // Resolve the Promise with 1 (success)
         }
      });
   });
}

const app = express();
app.use(cors()); // Enable CORS for all routes

app.use(express.json()); // Parse JSON request bodies

const server = http.createServer(app);

//
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server }); // Attach WebSocket server to the HTTP server

wss.on('connection', (ws) => {
  // Handle WebSocket connection
  console.log('WebSocket Server Active');
  // ...
});
//

port = 3000
server.listen(port, '0.0.0.0', function () {
  console.log('HTTP server listening on port 3000');
});

// Test just NodeJSServer
app.get('/test', function (req, res) {
   const responseData = {
     status: 1
   };
 
   res.statusCode = 200;
   res.setHeader('Content-Type', 'application/json');
   res.json(responseData);
});

// Test NodeJS and Socket Server
app.post('/test', function (req, res) {
   // Access the data sent in the request body
   const requestData = req.body;

   console.log(requestData);

   const socketAddress = requestData.socketAddress;
   const socketPort = requestData.socketPort;

   testSocketServer(socketAddress, Number(socketPort))
      .then((result) => {
         let responseData;
         if(result){
            responseData = {
               status: true
            };
         }else{
            responseData = {
               status: false
            };
         }
         res.status(200).json(responseData);
         console.log('Connection successful:', result); // 1
      })
      .catch((error) => {
         const responseData = {
            status: false
         };
         res.status(200).json(responseData);
         console.error('Connection error:', error);
         // Handle the error appropriately
      });

});

// Login Request
app.post('/login', function (req, res) {
   // Access the data sent in the request body
   const requestData = req.body;

   console.log(requestData);

   const socketAddress = requestData.socketAddress;
   const socketPort = requestData.socketPort;
   const username = encryptString(requestData.username);
   const password = encryptString(requestData.password);

   tryLogin(socketAddress, Number(socketPort), username, password)
      .then((result) => {
         let responseData;
         if(result){
            responseData = {
               status: true
            };
         }else{
            responseData = {
               status: false
            };
         }
         res.status(200).json(responseData);
         console.log('Login:', result); // 1
      })
      .catch((error) => {
         let responseData;
         responseData = {
            status: false
         };
         res.status(200).json(responseData);
         console.error('connection error:', error);
         // Handle the error appropriately
      });
});

// Register Request
app.post('/register', function (req, res) {
   // Access the data sent in the request body
   const requestData = req.body;

   console.log(requestData);

   const socketAddress = requestData.socketAddress;
   const socketPort = requestData.socketPort;
   const username = encryptString(requestData.username);
   const password = encryptString(requestData.password);

   tryRegister(socketAddress, Number(socketPort), username, password)
      .then((result) => {
         let responseData;
         if(result){
            responseData = {
               status: true
            };
         }else{
            responseData = {
               status: false
            };
         }
         res.status(200).json(responseData);
         console.log('Register:', result); // 1
      })
      .catch((error) => {
         let responseData;
         responseData = {
            status: false
         };
         res.status(200).json(responseData);
         console.error('connection error:', error);
         // Handle the error appropriately
      });

});

// Create Group Request
app.post('/createGroup', function (req, res) {
   // Access the data sent in the request body
   const requestData = req.body;

   console.log(requestData);

   const socketAddress = requestData.socketAddress;
   const socketPort = requestData.socketPort;
   const username = encryptString(requestData.username);
   const groupName = encryptString(requestData.groupName);

   tryCreateGroup(socketAddress, Number(socketPort), username, groupName)
      .then((result) => {
         let responseData;
         if(result){
            responseData = {
               status: true
            };
         }else{
            responseData = {
               status: false
            };
         }
         res.status(200).json(responseData);
         console.log('created group:', result); // 1
      })
      .catch((error) => {
         let responseData;
         responseData = {
            status: false
         };
         res.status(200).json(responseData);
         console.error('connection error:', error);
         // Handle the error appropriately
      });
});

// Join Group Request
app.post('/joinGroup', function (req, res) {
   // Access the data sent in the request body
   const requestData = req.body;

   console.log(requestData);

   const socketAddress = requestData.socketAddress;
   const socketPort = requestData.socketPort;
   const username = encryptString(requestData.username);
   const groupName = encryptString(requestData.groupName);

   tryJoinGroup(socketAddress, Number(socketPort), username, groupName)
      .then((result) => {
         let responseData;
         if(result == 1){
            responseData = {
               status: true
            };
         }else{
            let message = '';
            if(result == 2){
               message = "Pending Request to Join";
            }else if(result == 3){
               message = "Already Member of Group";
            }else{
               message = "Group does not exist";
            }
            responseData = {
               status: false,
               message: message
            };
         }
         res.status(200).json(responseData);
         console.log('joined group:', result); // 1
      })
      .catch((error) => {
         let responseData;
         responseData = {
            status: false
         };
         res.status(200).json(responseData);
         console.error('connection error:', error);
         // Handle the error appropriately
      });
});

// Get User Groups Request
app.post('/getUserGroups', function (req, res) {
   // Access the data sent in the request body
   const requestData = req.body;

   console.log(requestData);

   const socketAddress = requestData.socketAddress;
   const socketPort = requestData.socketPort;
   const username = encryptString(requestData.username);

   tryGetUserGroups(socketAddress, Number(socketPort), username)
      .then((result) => {
         const responseData = {
            status: true,
            groups: result
         };
         res.status(200).json(responseData);
         console.log('groups list:', result); // 1
      })
      .catch((error) => {
         let responseData;
         responseData = {
            status: false,
            groups: ''
         };
         res.status(200).json(responseData);
         console.error('connection error:', error);
         // Handle the error appropriately
      });

});
// Get Group Users Request
app.post('/getGroupUsers', function (req, res) {
   // Access the data sent in the request body
   const requestData = req.body;

   console.log(requestData);

   const socketAddress = requestData.socketAddress;
   const socketPort = requestData.socketPort;
   const groupName = encryptString(requestData.groupName);

   tryGetGroupUsers(socketAddress, Number(socketPort), groupName)
      .then((result) => {
         const responseData = {
            status: true,
            users: result
         };
         res.status(200).json(responseData);
         console.log('group users:', result); // 1
      })
      .catch((error) => {
         let responseData;
         responseData = {
            status: false,
            users: ''
         };
         res.status(200).json(responseData);
         console.error('connection error:', error);
         // Handle the error appropriately
      });
});
// Get Group Pending Users Request
app.post('/getGroupPending', function (req, res) {
   // Access the data sent in the request body
   const requestData = req.body;

   console.log("aqui",requestData);

   const socketAddress = requestData.socketAddress;
   const socketPort = requestData.socketPort;
   const groupName = encryptString(requestData.groupName);

   tryGetGroupPending(socketAddress, Number(socketPort), groupName)
      .then((result) => {
         const responseData = {
            status: true,
            users: result
         };
         res.status(200).json(responseData);
         console.log('group pending users:', result); // 1
      })
      .catch((error) => {
         let responseData;
         responseData = {
            status: false,
            users: ''
         };
         res.status(200).json(responseData);
         console.error('connection error:', error);
         // Handle the error appropriately
      });
});
// Get Group Conv Request
app.post('/getGroupConv', function (req, res) {
   // Access the data sent in the request body
   const requestData = req.body;

   console.log(requestData);

   const socketAddress = requestData.socketAddress;
   const socketPort = requestData.socketPort;
   const groupName = encryptString(requestData.groupName);

   tryGetGroupConv(socketAddress, Number(socketPort), groupName)
      .then((result) => {
         const responseData = {
            status: true,
            messages: result
         };
         res.status(200).json(responseData);
         console.log('group conv:', result); // 1
      })
      .catch((error) => {
         let responseData;
         responseData = {
            status: false,
            messages: ''
         };
         res.status(200).json(responseData);
         console.error('connection error:', error);
         // Handle the error appropriately
      });
});
// Send Message Request
app.post('/sendMessage', function (req, res) {
   // Access the data sent in the request body
   const requestData = req.body;

   console.log(requestData);

   const socketAddress = requestData.socketAddress;
   const socketPort = requestData.socketPort;
   const username = encryptString(requestData.username);
   const groupName = encryptString(requestData.groupName);
   const message = encryptString(requestData.message);

   trySendMessage(socketAddress, Number(socketPort), username, groupName, message)
      .then((result) => {
         const responseData = {
            status: result,
         };
         res.status(200).json(responseData);
         console.log('message sent:', result); // 1
      })
      .catch((error) => {
         let responseData;
         responseData = {
            status: false,
         };
         res.status(200).json(responseData);
         console.error('connection error:', error);
         // Handle the error appropriately
      });
});
// Get All Users Request
app.post('/getUsers', function (req, res) {
   // Access the data sent in the request body
   const requestData = req.body;

   console.log(requestData);

   const socketAddress = requestData.socketAddress;
   const socketPort = requestData.socketPort;

   tryGetUsers(socketAddress, Number(socketPort))
      .then((result) => {
         const responseData = {
            status: true,
            users: result
         };
         res.status(200).json(responseData);
         console.log('users:', result); // 1
      })
      .catch((error) => {
         let responseData;
         responseData = {
            status: false,
            users: ''
         };
         res.status(200).json(responseData);
         console.error('connection error:', error);
         // Handle the error appropriately
      });
});
// Add User to Group Request
app.post('/addUser', function (req, res) {
   // Access the data sent in the request body
   const requestData = req.body;

   console.log(requestData);

   const socketAddress = requestData.socketAddress;
   const socketPort = requestData.socketPort;
   const adminUsername = encryptString(requestData.adminUsername);
   const newUsername = encryptString(requestData.newUsername);
   const groupName = encryptString(requestData.groupName);

   tryAddUser(socketAddress, Number(socketPort), adminUsername, newUsername, groupName)
      .then((result) => {
         const responseData = {
            status: result,
         };
         res.status(200).json(responseData);
         console.log('message sent:', result); // 1
      })
      .catch((error) => {
         let responseData;
         responseData = {
            status: false,
         };
         res.status(200).json(responseData);
         console.error('connection error:', error);
         // Handle the error appropriately
      });
});
// Accept Join Request User to Group
app.post('/acceptJoinRequest', function (req, res) {
   // Access the data sent in the request body
   const requestData = req.body;

   console.log(requestData);

   const socketAddress = requestData.socketAddress;
   const socketPort = requestData.socketPort;
   const adminUsername = encryptString(requestData.adminUsername);
   const newUsername = encryptString(requestData.newUsername);
   const groupName = encryptString(requestData.groupName);

   tryAcceptJoinRequest(socketAddress, Number(socketPort), adminUsername, newUsername, groupName)
      .then((result) => {
         const responseData = {
            status: result,
         };
         res.status(200).json(responseData);
         console.log('message sent:', result); // 1
      })
      .catch((error) => {
         let responseData;
         responseData = {
            status: false,
         };
         res.status(200).json(responseData);
         console.error('connection error:', error);
         // Handle the error appropriately
      });
});
// Reject Join Request User to Group
app.post('/rejectJoinRequest', function (req, res) {
   // Access the data sent in the request body
   const requestData = req.body;

   console.log(requestData);

   const socketAddress = requestData.socketAddress;
   const socketPort = requestData.socketPort;
   const adminUsername = encryptString(requestData.adminUsername);
   const newUsername = encryptString(requestData.newUsername);
   const groupName = encryptString(requestData.groupName);

   tryRejectJoinRequest(socketAddress, Number(socketPort), adminUsername, newUsername, groupName)
      .then((result) => {
         const responseData = {
            status: result,
         };
         res.status(200).json(responseData);
         console.log('message sent:', result); // 1
      })
      .catch((error) => {
         let responseData;
         responseData = {
            status: false,
         };
         res.status(200).json(responseData);
         console.error('connection error:', error);
         // Handle the error appropriately
      });
});

/*
client.connect(port, function () {
   console.log("Connected to server on port " + port);
   client.write('Hi from the client');
 });
 
 client.on('data', function (data) {
   console.log("Client 1 received from server: " + data);
 });
 
 client.on('close', function () {
   console.log('Client 1: Connection Closed');
 });
 
 client.on('error', function (error) {
   console.error("Connection Error: " + error);
 });  */