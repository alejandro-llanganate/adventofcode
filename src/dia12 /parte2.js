const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input.txt', {encoding: 'utf-8'});
  return data.split('\n');
};

const solucion = async () => {
  const lines = await readLines();
  const commands = lines.map(parseCommand);
  const { x, y } = calular(commands);
  return Math.abs(x) + Math.abs(y);
};

const calular = (commands) => {
  const embarcacion = { x: 0, y: 0 };
  let referencia = { x: 10, y: 1 };
  for (let command of commands) {
    const { tipo, valor } = command;
    if (tipo === 'N') {
      referencia.y += valor;
    } else if (tipo === 'S') {
      referencia.y -= valor;
    } else if (tipo === 'E') {
      referencia.x += valor;
    } else if (tipo === 'W') {
      referencia.x -= valor;
    } else if (tipo === 'L') {
      const angulo = transformacionRadianes(valor);
      referencia = rotatePoint(referencia, angulo);
    } else if (tipo === 'R') {
      const angulo = transformacionRadianes(valor);
      referencia = rotatePoint(referencia, -angulo);
    } else {
      embarcacion.x += referencia.x * valor;
      embarcacion.y += referencia.y * valor;
    }
  }
  return embarcacion;
};

const rotatePoint = (point, angulo) => {
  const { x, y } = point;
  const nuevaX = Math.round((x * Math.cos(angulo)) - (y * Math.sin(angulo)));
  const nuevaY = Math.round((y * Math.cos(angulo)) + (x * Math.sin(angulo)));
  return { x: nuevaX, y: nuevaY }
};

const transformacionRadianes = (deg) => deg * (Math.PI / 180);


const parseCommand = (line) => {
  const tipo = line[0];
  const valor = Number(line.slice(1));
  return { tipo, valor };
};

solucion().then(console.log); // 52203