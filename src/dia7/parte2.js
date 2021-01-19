const { read } = require('fs');

const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input.txt', {encoding: 'utf-8'});
  return data.split('\n');
};
const solucion = async () => {
  const lines = await readLines();
  const estructura = {};
  for (let line of lines) {
    const { destino, fuente } = parseLine(line);
    estructura[destino] = fuente;
  }

  return recorrer(estructura, 'shiny gold bag') - 1;
};

const recorrer = (estructura, node) => {
  let count = 1;
  for (let vecino in estructura[node]) {
    const qty = estructura[node][vecino];
    count += qty * recorrer(estructura, vecino);
  }
  return count;
};

const parseLine = (line) => {
  const [ destino, rest ] = line.split('s contain ');
  if (rest.slice(0, 3) === 'no ') {
    return {
      destino,
      fuente: {}
    };
  }

  const segmento = rest.split(', ');
  const fuente = {};
  for (let i = 0; i < segmento.length; i += 1) {
    const segment = segmento[i];
    const amount = Number(segment[0]);
    let origen = amount === 1 ? segment.slice(2) : segment.slice(2, -1);
    
    if (i === segmento.length - 1)
      origen = origen.slice(0, -1);

    fuente[origen] = amount;
  }

  return {
    destino,
    fuente
  };
};







solucion().then(console.log); // 108636