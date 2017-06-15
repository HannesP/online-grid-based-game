class Client {
    constructor(conn) {
        this.conn = conn;
    }
    
    message(type, payload) {
        const message = {type, payload};
        const string = JSON.stringify(message);
        this.conn.sendUTF(string);
    }
}

module.exports = Client;