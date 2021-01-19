let data = require('../assets/lector')('../data/day24.txt');

const mosaicos = data.split('\n')
                     .filter(x => x);

let baldozasNegras = new Set();


/************************* PARTE  1 ******************************/

const obtenerDeltas = {
    'nw': {dx: 0, dy: -1}, 'ne': {dx: 1, dy: -1},
    'w': {dx: -1, dy: 0}, 'e': {dx: 1, dy: 0},
    'sw': {dx: -1, dy: 1},'se': {dx: 0, dy: 1},
}

const identificarCoordenadas = (x, y) => {
    return `${x}#${y}`;
}

for (const direccion of mosaicos) {
    const direcciones = [...direccion.matchAll(/e|se|sw|w|nw|ne/g)].map(e => e[0]);
    let x = 0;
    let y = 0;

    for (const direction of direcciones) {
        x += obtenerDeltas[direction].dx;
        y += obtenerDeltas[direction].dy;
    }
    
    const key = identificarCoordenadas(x, y);
    if(baldozasNegras.has(key)) {
        baldozasNegras.delete(key);
    } else {
        baldozasNegras.add(key);
    }
}

console.log(`Parte 1:\n${baldozasNegras.size}`);

/************************* PARTE  2 ******************************/

const dias = 100;

const obtenerVecinos = (x, y) => {
    const resultados = [];
    for (const direccion in obtenerDeltas) {
        resultados.push({
            x: x+obtenerDeltas[direccion].dx, y: y+obtenerDeltas[direccion].dy
        });
    }
    return resultados;
}

for (let i = 1; i <= dias; i++) {
    let nuevasBalfozasNegras = new Set();
    const keys = baldozasNegras.keys();

    for (const baldoza of keys) {
        const [x, y] = baldoza.split('#').map(x => parseInt(x));
        const celdasContiguas = obtenerVecinos(x, y);

        celdasContiguas.push({x, y});

        for(const celda of celdasContiguas) {
            const actualID = identificarCoordenadas(celda.x, celda.y);
            const vecinos = obtenerVecinos(celda.x, celda.y);
            const totalBaldozasNegras = vecinos.filter(n => baldozasNegras.has(identificarCoordenadas(n.x, n.y))).length;

            if(baldozasNegras.has(actualID)) {
                (totalBaldozasNegras > 2 || totalBaldozasNegras === 0) ?
                    nuevasBalfozasNegras.delete(actualID) :
                    nuevasBalfozasNegras.add(actualID);
            } else {
                if(totalBaldozasNegras === 2)
                    nuevasBalfozasNegras.add(actualID);
            }            
        }
    }
    baldozasNegras = nuevasBalfozasNegras;
}
console.log(`Parte 2:\n${baldozasNegras.size}`);   
