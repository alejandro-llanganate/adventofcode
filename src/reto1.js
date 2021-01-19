let fs = require('fs')

const gastos = fs.readFileSync(
    'input.txt',
    {encoding: 'utf-8'} 
    )
    .split('\n')
    .map(x => parseInt(x));


for (let i = 0; i < gastos.length; i++) {
    for (let j = i+1; j < gastos.length; j++) {
        if(gastos[i]+gastos[j] == 2020) {
            console.log('solución 1' + gastos[i]*gastos[j]);
        }
    }
}


for (let i = 0; i < gastos.length; i++) {
    for (let j = i+1; j < gastos.length; j++) {
        for (let k = j+1; k < gastos.length; k++) {
            if(gastos[i]+gastos[j]+gastos[k] == 2020) {
                console.log('solución 2' + gastos[i]*gastos[j]*gastos[k]);
            }
        }
    }
}