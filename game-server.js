const game = require('./game');

class GameServer {
    constructor(webSocketServer) {
        this.game = new Game();
        this.clients = [];
    }
    
    onRequest() {
        
    }
    
    onMessage() {
        
    }
    
    onClose() {
        
    }
}

module.exports = GameServer;