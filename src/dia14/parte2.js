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
      const floatingAddress = getFloating(address, mask);
      const addresses = getAddresses(floatingAddress);
      for (let addr of addresses) {
        memoria[addr] = valor;
      }
    }
  }

  const valors = Object.valors(memoria);
  return valors.reduce((a, b) => a + b);
};

const getFloating = (address, mask) => {
  let newAddress = '';
  for (let i = 0; i < address.length; i += 1) {
    if (mask[i] === '0') {
      newAddress += address[i];
    } else {
      newAddress += mask[i];
    }
  }
  return newAddress;
};

const getAddresses = (floatingAddress) => {
  if (floatingAddress.length === 0)
    return [''];
  
  const primerCaracter = floatingAddress[0];
  const restAddress = floatingAddress.slice(1);
  const memoriaParcial = getAddresses(restAddress);
  if (primerCaracter === 'X') {
    return [
      ...memoriaParcial.map(addr => '0' + addr),
      ...memoriaParcial.map(addr => '1' + addr)
    ]
  } else {
    return memoriaParcial.map(addr => primerCaracter + addr);
  }
};


const parseCommand = (line) => {
  const [ seg1, seg2 ] = line.split(' = ');
  if (seg1.slice(0,3) === 'mem') {
    const openBracket = seg1.indexOf('[');
    const closeBracket = seg1.indexOf(']');

    return {
      tipo: 'mem',
      address: Number(seg1.slice(openBracket + 1, closeBracket)).toString(2).padStart(36, '0'),
      valor: Number(seg2)
    }
  } else {
    return {
      tipo: 'mask',
      valor: seg2
    }
  }
};


solucion().then(console.log);