const fs = require('fs');

const lines = fs.readFileSync('day12.txt', {encoding: 'utf-8'}).split('\n').filter(x => x);

const directionToCoord = {
    0: 'E',
    1: 'N',
    2: 'W',
    3: 'S',
}

class Boat {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.direction = 0;
    }

    move(char, number) {
        switch(char) {
            case 'N':
                this.y += number;
                break;
            case 'S':
                this.y -= number;
                break;
            case 'E':
                this.x += number;
                break;
            case 'W':
                this.x -= number;
                break;
            case 'L':
                this.direction = ((this.direction + (number / 90)) + 4)%4;
                break;
            case 'R':
                this.direction = ((this.direction - (number / 90)) + 4)%4;
                break;
            case 'F':
                this.move(directionToCoord[this.direction], number);
                break;
            default:
                throw new Error('Not implemented: ' + char);
                break;
        }
    }

    getPosition() {
        return Math.abs(this.x) + Math.abs(this.y);
    }
}

const boat = new Boat();

lines.forEach(line => {
    const {groups} = /^(?<char>.)(?<number>\d+)$/.exec(line);
    boat.move(groups.char, parseInt(groups.number));
    console.log(boat.x, boat.y);
})

console.log(boat.getPosition());
