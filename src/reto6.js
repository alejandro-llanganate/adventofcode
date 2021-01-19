let data = require('../assets/lector')('../data/day6.txt');
let filas = data.split('\n');

/******************** PARTE 1 ********************/

let cantidadRespuestasConSí = 0;
let acumulador = new Set();

filas.map( fila => {
    if(fila !== ''){
        for( const respuesta of fila.split('')){
            acumulador.add(respuesta);
        }
        }else {
            cantidadRespuestasConSí += acumulador.size;
            acumulador = new Set();
        }
    }
)

console.log("Parte 1: " + cantidadRespuestasConSí)

/******************** PARTE 2 ********************/

cantidadRespuestasConSí = 0; // sum
acumulador = new Map(); // map
conteoGrupos = 0; // count

filas.map( fila => {
    if(fila !== ''){
        conteoGrupos ++;
        for( const respuesta of fila.split('')){
            if(acumulador.has(respuesta)){
                acumulador.set(respuesta, acumulador.get(respuesta) + 1)
            }else {
                acumulador.set(respuesta, 1)
            }
        }
        }else {
            let conteoDeTodosLosSi = 0 ;
            for(const numeroDeRespuestas of acumulador.values()){
                if(numeroDeRespuestas === conteoGrupos){
                    conteoDeTodosLosSi++;
                }
            }
            cantidadRespuestasConSí += conteoDeTodosLosSi;
            acumulador = new Map();
            conteoGrupos = 0;
        }
    }
)

console.log("Parte 2: " + cantidadRespuestasConSí)