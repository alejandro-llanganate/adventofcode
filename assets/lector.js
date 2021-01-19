function leerDatos(path){
    const fs = require('fs');
    const data = fs.readFileSync(path, {encoding: 'utf-8'});
    return data;
}

module.exports = leerDatos;
