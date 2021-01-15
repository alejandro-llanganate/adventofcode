

const input =[ "1-3 a: abcde",
    "1-3 b: cdefg",
    "2-9 c: ccccccccc" ]
 
let count = 0;
let valido=0;
for (let item of input ){

    let splitted  = item.split(':')
    
   /*  console.log(splitted.length) */
    let politica = splitted[0];
  /*   console.log(politica); */
    let password = splitted[1].trim(); 
   /*  console.log(password); */
    let ranges =  politica.split(' ')[0]
   /*  console.log(ranges) */
    let startRange = Number(ranges.split('-')[0])
    let endRange = Number(ranges.split('-')[1])
    /* console.log(endRange); */
    let letra = politica.split(' ')[1]
    /* console.log(letra); */

   
    for (let caracter of password.split('')){

        if(caracter === letra) ++count;
        /* console.log(caracter) */
    }
        if (count >= startRange && count<= endRange) ++valido;
    
    
    


   /*  console.log(ranges) */
    /* console.log(password); */


}

console.log(`las contraseñas validas son ${valido}`)