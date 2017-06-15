class Client {
    constructor(conn) {
        this.conn = conn;
        this.player = null;
    }
    
    message(type, payload) {
        const message = {type, payload};
        const string = JSON.stringify(message);
        this.conn.sendUTF(string);
    }
    
    disconnect() {
        this.conn.close();
    }
}

module.exports = Client;