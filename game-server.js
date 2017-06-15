const Game = require('./game');

class GameServer {
    constructor() {
        this.game = new Game();
        this.clients = [];
        
        this.handlers = {};
        this.handlerTypes = [];
        
        this.handle('JOIN', this.handleJoin);
        this.handle('TEST', this.handleTest);
    }
    
    // Handlers of external events, triggered in server.js
    
    onConnect(client) {
        this.clients.push(client);
    }
    
    onTextMessage(text, client) {
        let message;
        try {
            message = JSON.parse(text);
        } catch (e) {
            client.disconnect();
        }
        
        if (!('type' in message)) {
            client.disconnect();
        }
        
        const type = message.type;
        const payload = message.payload || {};
        
        if (this.handlerTypes.indexOf(type) != -1) {
            this.handlers[type](payload, client);
        } else {
            client.disconnect();
        }
    }
    
    onClose(client) {
        const player = client.player;
        if (player) {
            this.game.removePlayer(player);
        }
        
        const i = this.clients.indexOf(client);
        this.clients.splice(i, 1);
    }
    
    // Message handlers
    
    handleJoin(payload, client) {
        const name = payload.name;
        if (!name) {
            client.disconnect();
            return;
        }

        client.player = this.game.addPlayer(name)
    }
    
    handleTest(payload, client) {
        client.disconnect();
    }
    
    // Misc
    
    handle(type, handler) {
        this.handlerTypes.push(type);
        this.handlers[type] = handler.bind(this);
    }
}

module.exports = GameServer;