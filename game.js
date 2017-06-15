WIDTH = 10;
HEIGHT = 10;

class Game {
    constructor() {
        this.grid = Array(WIDTH*HEIGHT).fill(0);
        this.players = [];
    }
    
    addPlayer(name) {
        if (!name.length) {
            throw 'error2';
        }
        const player = {name, x: 3, y: 3};
        this.players.add(player);
        return player;
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