const fs = require('fs').promises;

const readLines = async () => { // lectura  del arhivo
  const data = await fs.readFile('./input.txt', {encoding: 'utf-8'});
  return data.split('\n');
};



const puntoCardinal = new Set(['N', 'S', 'E', 'W']);

const solucion = async () => {
  const lines = await readLines();
  const intrucion = lines.map(parseInstruccion);
  const cardinalintrucion = intrucion.filter(command => puntoCardinal.has(command.tipo));
  const rotationintrucion = intrucion.filter(command => !puntoCardinal.has(command.tipo));
  const cardinalDistancia = calcCardinal(cardinalintrucion);
  const ratacionDistancia = calcularRotacion(rotationintrucion);
  const deltaX = Math.abs(cardinalDistancia.x + ratacionDistancia.x);
  const deltaY = Math.abs(cardinalDistancia.y + ratacionDistancia.y);
  return deltaX + deltaY;
};
//         0
//         n     
// 270 w       e 90
//         s
//        180
const calcularRotacion = (intrucion) => {
  const embarcacion = { x: 0, y: 0, angulo: 90 };
  for (let command of intrucion) {
    const { tipo, valor } = command;
    if (tipo === 'L') {
      embarcacion.angulo = (360 + embarcacion.angulo - valor) % 360;
    } else if (tipo === 'R') {
      embarcacion.angulo = (embarcacion.angulo + valor) % 360;
    } else {
      if (embarcacion.angulo === 0) {
        embarcacion.y += valor;
      } else if (embarcacion.angulo === 180) {
        embarcacion.y -= valor;
      } else if (embarcacion.angulo === 90) {
        embarcacion.x += valor;
      } else if (embarcacion.angulo === 270) {
        embarcacion.x -= valor;
      }
    }
  };

  return embarcacion;
};


const calcCardinal = (intrucion) => {
  const embarcacion = { x: 0, y: 0 };
  for (let command of intrucion) {
    const { tipo, valor } = command;
    if (tipo === 'N') {
      embarcacion.y += valor;
    } else if (tipo === 'S') {
      embarcacion.y -= valor;
    } else if (tipo === 'E') {
      embarcacion.x += valor;
    } else if (tipo === 'W') {
      embarcacion.x -= valor;
    }
  }
  return embarcacion;
};

const parseInstruccion = (line) => {
  const tipo = line[0]; //  se  toma  el primer elemento 
  const valor = Number(line.slice(1)); // realizamos   cambio de tipo de dato
  return { tipo, valor };
};

solucion().then(console.log); // 1148