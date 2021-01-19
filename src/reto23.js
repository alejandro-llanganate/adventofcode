let [...data] = require('../assets/lector')('../data/day23.txt');

const etiquetasInput = data.map(e => parseInt(e));
let tazaActual = etiquetasInput[0];
const cantidadDeMovimientos = 100;
let numeroTazas = etiquetasInput.length;

for (let i = 0; i < cantidadDeMovimientos; i++) {

    let indiceTazaActual = etiquetasInput.indexOf(tazaActual), seleccionados = [];

    for (let k = 0; k < 3; k++) {
        let indice = (indiceTazaActual + 1) % numeroTazas;
        if(indice >= etiquetasInput.length) {
            indice = 0;
        }
        seleccionados = seleccionados.concat(etiquetasInput.splice(indice, 1));
    }

    indiceTazaActual = etiquetasInput.indexOf(tazaActual);

    let etiquetaDestino = etiquetasInput[indiceTazaActual] - 1;

    if(etiquetaDestino < 1) {
        etiquetaDestino = 9;
    }
    
    let tazaDestino = etiquetasInput.indexOf(etiquetaDestino);

    while(tazaDestino < 0) {
        etiquetaDestino--;
        if(etiquetaDestino < 1){
            etiquetaDestino = 9;
        }
        tazaDestino = etiquetasInput.indexOf(etiquetaDestino);
    }

    etiquetasInput.splice(tazaDestino+1, 0, ...seleccionados);

    tazaActual = etiquetasInput[(etiquetasInput.indexOf(tazaActual)+1)%numeroTazas];

}

const indicieValor1 = etiquetasInput.indexOf(1);
let i = (indicieValor1+1)%numeroTazas;
const resultados = [];

while(i != indicieValor1) {
    resultados.push(etiquetasInput[i]);
    i = (i+1)%numeroTazas;
}

// etiquetas luego de los 100 movimientos
console.log(resultados.join(""));

