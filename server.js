#!/usr/bin/env node

const WebSocketServer = require('websocket').server;
const http = require('http');
const express = require('express');

const GameServer = require('./game-server');
const GameClient = require('./game-client');

const gameServer = new GameServer();

const app = express();
app.use(express.static('public'))

app.listen(8081, () => { // -> 80
    console.log('Express Server listening on port 8081');
}); 
 
const httpServer = http.createServer((req, response) => {
    console.log((new Date()) + ' Received req for ' + req.url);
    response.writeHead(404);
    response.end();
});

httpServer.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
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
            gameServer.onTextMessage(msg.utf8Data, client);
        }
    });
    
    conn.on('close', function(reasonCode, description) {
        gameServer.onClose(client);
    });
})
