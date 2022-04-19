

'use strict';

const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

// client connections
var connects = []

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

 wss.on('connection', (ws) => {
   console.log('Client connected');
   connects.push(ws);
   console.log("New Client Connected : " + connects.length);


   ws.on('close', () => {
   console.log('Client disconnected');
   });


    ws.on('message', function (message) {
         console.log('received: %s', message);
        // broadcast(message);  // Return to client
        // ws.send('echo: ' + message);

         wss.clients.forEach((client) => {
    client.send(message);
  });
        
    });
     
 });

 

// setInterval(() => {
//   wss.clients.forEach((client) => {
//     client.send(new Date().toTimeString());
//   });
// }, 1000);

 // function broadcast (message) {
 //     connects.forEach(function (socket, i) {
 //         socket.send(message);
 //     });
 // }
