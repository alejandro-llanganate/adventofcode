const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input.txt', {encoding: 'utf-8'});
  return data.split('\n');
};

const solucion = async () => {
  const lines = await readLines();
  const commands = lines.map(parseCommand);
  const memoria = {};
  let mask = null;
  for (let command of commands) {
    const { tipo, valor, address } = command;
    if (tipo === 'mask') {
      mask = valor;
    } else {
      const maskedvalor = aplicarMascara(valor, mask);
      memoria[address] = maskedvalor;
    }
  }
  const base10 = Object.valors(memoria).map(bin => parseInt(bin, 2));
  return base10.reduce((a, b) => a + b);
};

const aplicarMascara = (valor, mask) => {
  let newvalor = '';
  for (let i = 0; i < valor.length; i += 1) {
    if (mask[i] === 'X') {
      newvalor += valor[i];
    } else {
      newvalor += mask[i];
    }
  }

  return newvalor;
};

const parseCommand = (line) => {
  const [ seg1, seg2 ] = line.split(' = ');
  if (seg1.slice(0,3) === 'mem') {
    const openBracket = seg1.indexOf('[');
    const closeBracket = seg1.indexOf(']');

    return {
      tipo: 'mem',
      address: seg1.slice(openBracket + 1, closeBracket),
      valor: Number(seg2).toString(2).padStart(36, '0')
    }
  } else {
    return {
      tipo: 'mask',
      valor: seg2
    }
  }
}


solucion().then(console.log); 