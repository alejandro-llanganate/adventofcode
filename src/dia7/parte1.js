const { read } = require('fs');

const fs = require('fs').promises;    // función permite,  leer un arrchivo 
const readLines = async () => {
  const data = await fs.readFile('./input.txt', {encoding: 'utf-8'});

  return data.split('\n');

};

const solve = async () => {
  const lines = await readLines();
  const estructura = {};
  for (let line of lines) {
    const { destino, fuente } = leerLinea(line); // devueve  un objeto con un destino  y una matriz de una  fueent
    if (!(destino in estructura)) // apuntamos  al destino  en la estructura 
      estructura[destino] = []; // ese lugar  lo ocupamos con un vacio 
    
    for (let origen of fuente) {  //  itiramos  a trra vez  de  cada nodo origen 
      if (!(origen in estructura))
        estructura[origen] = [];
      estructura[origen].push(destino); //estoy agrregando mi nodo destino a la matriz que  tiene el nodo  orgigen
    }
  }
  
  return recorrer(estructura, 'shiny gold bag') - 1;
};

const recorrer = (estructura, node, visitado = new Set()) => {
  if (visitado.has(node))
    return 0;
  
  visitado.add(node);

  let numBagColors = 1;
  for (let vecina of estructura[node]) {
    numBagColors += recorrer(estructura, vecina, visitado);
  }
  return numBagColors;
};

const leerLinea = (line) => {
  const [ destino, rest ] = line.split('s contain ');

  const origenSegments = rest.split(', ');
  const fuente = [];
  for (let i = 0; i < origenSegments.length; i += 1) {
    const segmento = origenSegments[i];
    const cantidad = Number(segmento[0]);
    let origen = cantidad === 1 ? segmento.slice(2) : segmento.slice(2, -1);

    if (i === origenSegments.length - 1)
      origen = origen.slice(0, -1);

    fuente.push(origen);
  }
  
  return {
    destino,
    fuente
  };
};

solve().then(console.log); // 101