let [...data] = require('../assets/lector')('../data/day23.txt');

const etiquetasInput = data.map(e => parseInt(e));
let copaActual = etiquetasInput[0];
const cantidadDeMovimientos = 100;
let numeroCopas = etiquetasInput.length;

for (let i = 0; i < cantidadDeMovimientos; i++) {

    let indiceCopaActual = etiquetasInput.indexOf(copaActual), seleccionados = [];

    for (let k = 0; k < 3; k++) {
        let indice = (indiceCopaActual + 1) % numeroCopas;
        if(indice >= etiquetasInput.length) {
            indice = 0;
        }
        seleccionados = seleccionados.concat(etiquetasInput.splice(indice, 1));
    }

    indiceCopaActual = etiquetasInput.indexOf(copaActual);

    let etiquetaDestino = etiquetasInput[indiceCopaActual]-1;

    if(etiquetaDestino < 1) {
        etiquetaDestino = 9
    }
    
    let destinationCup = etiquetasInput.indexOf(etiquetaDestino);

    while(destinationCup < 0) {
        etiquetaDestino--;
        if(etiquetaDestino < 1){
            etiquetaDestino = 9
        }
        destinationCup = etiquetasInput.indexOf(etiquetaDestino);
    }

    etiquetasInput.splice(destinationCup+1, 0, ...seleccionados);

    copaActual = etiquetasInput[(etiquetasInput.indexOf(copaActual)+1)%numeroCopas];
}

const indicieValor1 = etiquetasInput.indexOf(1);
let i = (indicieValor1+1)%numeroCopas;
const resultados = [];

while(i != indicieValor1) {
    resultados.push(etiquetasInput[i]);
    i = (i+1)%numeroCopas;
}

// etiquetas luego de los 100 movimientos
console.log(resultados.join(""));

