#!/usr/bin/env node

const WebSocketServer = require('websocket').server;
const http = require('http');
const express = require('express');

const game = require('./game');

const app = express();
app.use(express.static('public'))

app.listen(8081, () => { // -> 80
    console.log('Express Server listening on port 8081');
}); 
 
const server = http.createServer((req, response) => {
    console.log((new Date()) + ' Received req for ' + req.url);
    response.writeHead(404);
    response.end();
});

server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});
 
const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});
 
function originIsAllowed(origin) {
    return true;
}
 
wsServer.on('request', (req) => {
    if (!originIsAllowed(reg.origin)) {
        req.reject();
        console.log((new Date()) + ' Connection from origin ' + req.origin + ' rejected.');
        return;
    }
    
    const conn = req.accept('ogbg-protocol', req.origin);
    console.log((new Date()) + ' Connection accepted.');
    // game.onConnect(conn);
    
    conn.on('message', (msg) => {
        if (msg.type == 'utf8') {
            console.log('Received Message: ' + msg.utf8Data);
            // game.onReceived(msg.utf8Data);
            // conn.sendUTF(msg.utf8Data);
        }/* else if (msg.type == 'binary') {
            console.log('Received Binary Message of ' + msg.binaryData.length + ' bytes');
            conn.sendBytes(msg.binaryData);
        }*/
    });
    
    conn.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + conn.remoteAddress + ' disconnected.');
    });
});