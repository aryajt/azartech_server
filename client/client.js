// client.js
const WebSocket = require('websocket').client;

const client = new WebSocket();

client.on('connect', function(connection) {
  console.log('Connected to server');

  // Encrypt userId with AES (example function)
  function encryptUserId(userId) {
    // Implement your AES encryption logic here
    return encryptedUserId;
  }

  const userId = '123'; // Replace with your actual userId
  const encryptedUserId = encryptUserId(userId);

  // Send the encrypted userId to the server
  connection.send(JSON.stringify({ userId: encryptedUserId }));

  // Handle received messages from the server
  connection.on('message', function(message) {
    console.log('Received:', message.utf8Data);
  });

  // Handle connection close event
  connection.on('close', function() {
    console.log('Disconnected from server');
  });
});

client.connect('ws://localhost:3000/');
