const Game = require('./game');

class GameServer {
    constructor() {
        this.game = new Game();
        this.clients = [];
        
        this.handlers = {};
        this.handlerTypes = [];
        
        this.setupHandlers();
    }
    
    setupHandlers() {
        this.handle('JOIN', this.handleJoin);
        this.handle('TEST', this.handleTest);   
        this.handle('MOVE_UP', this.handleMoveUp);
        this.handle('MOVE_DOWN', this.handleMoveDown);
        // etc
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
    
    // Message Handlers
    // * The message handlers are set up in setupHandlers
    // * No assumptions can be made about the contents of `payload`
    // * Faulty payloads should result in disconnection of the client
    
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
    
    handleMoveUp(payload, client) {
        // this.game.moveUp(client.player);
    }
    
    handleMoveDown(payload, client) {
        // this.game.moveDown(client.player);
    }
    
    // Misc
    
    handle(type, handler) {
        this.handlerTypes.push(type);
        this.handlers[type] = handler.bind(this);
    }
}

module.exports = GameServer;