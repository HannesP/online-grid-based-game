#!/usr/bin/env node

const WebSocketServer = require('websocket').server;
const http = require('http');
const express = require('express');

const GameServer = require('./game-server');
const GameClient = require('./game-client');

const gameServer = new GameServer();

const appPort = 8081;
const wsPort = 8080;

const app = express();
app.use(express.static('public'));

app.listen(appPort, () => {
    console.log(new Date() + ' Express Server listening on port ' + appPort);
});
 
const httpServer = http.createServer((req, response) => {
    console.log(new Date() + ' Received req for ' + req.url);
    response.writeHead(404);
    response.end();
});

httpServer.listen(wsPort, function() {
    console.log((new Date()) + ' WebSocket server is listening on port ' + wsPort);
});

const wsServer = new WebSocketServer({
    httpServer,
    autoAcceptConnections: false
});
 
function originIsAllowed(origin) {
    return true;
}

wsServer.on('request', (req) => {
    if (!originIsAllowed(req.origin)) {
        return;
    }
    
    const conn = req.accept('ogbg-protocol', req.origin);
    const client = new GameClient(conn);
    gameServer.onConnect(client);
    
    conn.on('message', (msg) => {        
        if (msg.type == 'utf8') {
            console.log(new Date() + ' Message received: ' + msg.utf8Data);
            gameServer.onTextMessage(msg.utf8Data, client);
        }
    });
    
    conn.on('close', function(reasonCode, description) {
        gameServer.onClose(client);
    });
})
