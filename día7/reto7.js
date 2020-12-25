const fs = require('fs');

const lineasArchivo = fs.readFileSync(
    'input.txt',
    {encoding: 'utf-8'}
).split('\n').filter(x => x);

const map = new Map();

function contieneShinyGold(color) {
    if (color === 'shiny gold') {
        return true;
    }
    if (!map.has(color)){
        return false;
    }

    const bagsInteriores = map.get(color);
    for (e of bagsInteriores){
        if(contieneShinyGold(e)){
            return true;
        }
    }
    return false;
}

for(rule of lineasArchivo){
    let [bag,  ...bags] = rule.replace(/\./g,'').split(/ bags contain |,/);
    bags.map( e => {
        descripcion = e.replace(/ bag(s)?/,'');
        const {groups: grupos} = /\s{0,1}((?<num>\d+)\s{1})?(?<color>.*)/.exec(descripcion);
        // console.log(bag, grupos)
        !map.has(bag) ? map.set(bag, []) : "";
        map.set(bag, [...map.get(bag), grupos.color])
    })
}


const colores = map.keys();
let totalCoincidencias = 0;

for(const color of colores){
    if(contieneShinyGold(color) && color != 'shiny gold') {
        totalCoincidencias++;
    }
}

console.log(totalCoincidencias);