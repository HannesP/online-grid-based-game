WIDTH = 10;
HEIGHT = 10;

class Game {
    constructor() {
        this.grid = Array(WIDTH*HEIGHT).fill(0);
        this.players = [];
    }
    
    addPlayer(name) {
        if (!name) {
            console.error('Invalid name in Game.addPlayer');
            return null;
        }
        
        const player = {name, x: 3, y: 3};
        this.players.push(player);
        return player;
    }
    
    removePlayer(player) {
        const i = this.players.indexOf(player);
        if (i == -1) return;
        this.players.splice(i, 1);
    }
    
    squareAt(x, y) {
        const i = y*WIDTH + x;
        if (i >= WIDTH*HEIGHT) {
            throw 'error1';
        }
        return this.grid[i];
    }
}

module.exports = Game;