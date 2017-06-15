const Game = require('./game');

class GameServer {
    constructor(webSocketServer) {
        this.game = new Game();
        this.clients = [];
    }
    
    onTextMessage(text, client) {
        let message;
        try {
            message = JSON.parse(text);
        } catch (e) {
            // console.log('Invalid message from ' + conn.origin);
            return;
        }
        
        const type = message.type;
        const payload = message.payload;
        
        client.message('HELLO', {body: `Hi there, ${payload.name} in ${payload.location}!`});
    }
    
    onClose(conn) {
        
    }
}

module.exports = GameServer;