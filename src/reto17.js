let data = require('../assets/lector')('../data/day17.txt');

const cubos = data
             .split(/\n/)
             .filter(x => x)
             .map(e => e.split(''));

let cubosActivos = new Set();

/*********************   PRIMERA PARTE   **********************/

// definimos los rangos iniciales para las iteraciones
let [xMin, xMax]  = [-1, cubos[0].length]; // [-1, 8]
let [yMin, yMax]  = [-1, cubos[0].length]; // [-1, 8]
let [zMin, zMax]  = [-1, 1];

// almacenamos las coordenadas del input con estado activo
for(y in cubos){
    for(x in cubos[y]){
        if(cubos[y][x] === "#"){
            cubosActivos.add(`${x},${y},0`);
        }
    }
}

// definimos una función para obtener el número de activos
function contarCubosVecinosActivos(cubosActivos, x,y,z){
    let cantidadActivos = 0;
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            for (let dz = -1; dz <= 1; dz++) {
                if (dx === 0 && dy === 0 && dz === 0) continue;
                if(cubosActivos.has(`${x+dx},${y+dy},${z+dz}`)){
                    cantidadActivos ++;
                } 
            }
        }
    }
    return cantidadActivos;
}

function configurarXYZ(x, y, z) {
    xMin = Math.min(xMin, x - 1);
    xMax = Math.max(xMax, x + 1);
    yMin = Math.min(yMin, y - 1);
    yMax = Math.max(yMax, y + 1);
    zMin = Math.min(zMin, z - 1);
    zMax = Math.max(zMax, z + 1);
}

function obtenerNumActivos3D() {
    let activos = new Set(cubosActivos);
    for (let ciclo = 0; ciclo < 6; ciclo++) {
        const activosEncontrados = new Set();
        for (let x = xMin; x <= xMax; x++) {
            for (let y = yMin; y <= yMax; y++) {
                for (let z = zMin; z <= zMax; z++) {
                    const coordenadasGeneradas = `${x},${y},${z}`;
                    const numVecinosActivos = contarCubosVecinosActivos(activos, x, y, z);
                    const permanecerActivo = activos.has(coordenadasGeneradas) ?
                                        (numVecinosActivos === 2 || numVecinosActivos === 3)
                                        : numVecinosActivos === 3;
                    if (permanecerActivo) {
                        activosEncontrados.add(coordenadasGeneradas);
                        configurarXYZ(x, y, z);
                    }
                }
            }
        }
        activos = activosEncontrados;
    }
    return activos.size;
}

console.log(`Parte 1: \n${obtenerNumActivos3D()}`);


/*********************   SEGUNDA PARTE   **********************/

[xMin, xMax]  = [-1, cubos[0].length]; // [-1, 8]
[yMin, yMax]  = [-1, cubos[0].length]; // [-1, 8]
[zMin, zMax]  = [-1, 1];
[wMin, wMax]  = [-1, 1];

function configurarXYZW(x, y, z, w) {
    configurarXYZ(x,y,z, w);
    wMin = Math.min(wMin, w - 1);
    wMax = Math.max(wMax, w + 1);
}

for(y in cubos){
    for(x in cubos[y]){
        if(cubos[y][x] === "#"){
            cubosActivos.add(`${x},${y},0,0`);
        }
    }
}

function contarCubosVecinosActivos4D(cubosActivos, x,y,z,w){
    let cantidadActivos = 0;
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            for (let dz = -1; dz <= 1; dz++) {
                for (let dw = -1; dw <= 1; dw++) {
                    if (dx === 0 && dy === 0 && dz === 0 && dw === 0) continue;
                    if(cubosActivos.has(`${x+dx},${y+dy},${z+dz},${w+dw}`)){
                        cantidadActivos ++;
                    } 
                }
            }
        }
    }
    return cantidadActivos;
}

function obtenerNumActivos4D() {
    let activos = new Set(cubosActivos);
    for (let ciclo = 0; ciclo < 6; ciclo++) {
        const activosEncontrados = new Set();
        for (let x = xMin; x <= xMax; x++) {
            for (let y = yMin; y <= yMax; y++) {
                for (let z = zMin; z <= zMax; z++) {
                    for (let w = wMin; w <= wMax; w++) {
                        const coordenadasGeneradas = `${x},${y},${z},${w}`;
                        const numVecinosActivos = contarCubosVecinosActivos4D(activos, x, y, z, w);
                        const permanecerActivo = activos.has(coordenadasGeneradas) ?
                                            (numVecinosActivos === 2 || numVecinosActivos === 3)
                                            : numVecinosActivos === 3;
                        if (permanecerActivo) {
                            activosEncontrados.add(coordenadasGeneradas);
                            configurarXYZW(x, y, z, w);
                        }
                    }
                }
            }
        }
        activos = activosEncontrados;
    }
    return activos.size;
}

console.log(`Parte 2: \n${obtenerNumActivos4D()}`);