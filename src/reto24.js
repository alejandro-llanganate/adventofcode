let data = require('../assets/lector')('../data/day24.txt');

const mosaicos = data.split('\n')
                     .filter(x => x);

let baldosasNegras = new Set();


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
    const direcciones = [...direccion.matchAll(/ne|se|e|w|sw|nw/g)].map(e => e[0]);
    let x = 0, y = 0;
    for (const direccion of direcciones) {
        x += obtenerDeltas[direccion].dx;
        y += obtenerDeltas[direccion].dy;
    }
    const key = identificarCoordenadas(x, y);
    if(baldosasNegras.has(key)) {
        baldosasNegras.delete(key);
    } else {
        baldosasNegras.add(key);
    }
}
console.log(`Parte 1:\n${baldosasNegras.size}`);

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
    let nuevasBaldosasNegras = new Set();
    const keys = baldosasNegras.keys();

    for (const baldoza of keys) {
        const [x, y] = baldoza.split('#').map(x => parseInt(x));
        const celdasContiguas = obtenerVecinos(x, y);

        celdasContiguas.push({x, y});

        for(const celda of celdasContiguas) {
            const actualID = identificarCoordenadas(celda.x, celda.y);
            const vecinos = obtenerVecinos(celda.x, celda.y);
            const totalBaldosasNegras = vecinos.filter(n => baldosasNegras.has(identificarCoordenadas(n.x, n.y))).length;

            if(baldosasNegras.has(actualID)) {
                (totalBaldosasNegras > 2 || totalBaldosasNegras === 0) ?
                    nuevasBaldosasNegras.delete(actualID) :
                    nuevasBaldosasNegras.add(actualID);
            } else {
                if(totalBaldosasNegras === 2)
                    nuevasBaldosasNegras.add(actualID);
            }            
        }
    }
    baldosasNegras = nuevasBaldosasNegras;
}
console.log(`Parte 2:\n${baldosasNegras.size}`);   
