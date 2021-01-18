let data = require('../assets/lector')('../data/day22.txt');

const [cartasJugador1, cartasJugador2] = data
                                    .split(/\n{2}/)
                                    .map(cartas => {
                                        cartas = cartas.replace(/\n+$/,'').split('\n');
                                        return cartas.map( x => parseInt(x)).filter( x => parseInt(x));
                                    });

/******************************   PARTE 1   *****************************/

const jugar = (cartasJugador1, cartasJugador2) => {
    while(cartasJugador1.length > 0 && cartasJugador2.length > 0){
        const cartaSuperiorJ1 = cartasJugador1.shift(); // extracción de la carta superior del Jugador 1
        const cartaSuperiorJ2 = cartasJugador2.shift(); // extracción de la carta superior del Jugador 2

        if(cartaSuperiorJ1 > cartaSuperiorJ2){
            // colocación de cartas cuando gana el Jugador 1 la ronda
            cartasJugador1.push(cartaSuperiorJ1); 
            cartasJugador1.push(cartaSuperiorJ2);
        }else{
            // colocación de cartas cuando gana el Jugador 2 la ronda
            cartasJugador2.push(cartaSuperiorJ2);
            cartasJugador2.push(cartaSuperiorJ1);            
        }
    }
    const ganador = cartasJugador1.length === 0 ? {jugador: "Jugador 2", baraja: cartasJugador2} 
                                                : {jugador: "Jugador 1", baraja: cartasJugador1};
    return ganador;
}

const obtenerPuntaje = ({ baraja }) => {
    return baraja.reduce((accumulador, elementoActual, index) => 
                          accumulador + (elementoActual * (baraja.length - index)), 0);
}

const partida = jugar([...cartasJugador1], [...cartasJugador2]);
console.log(`*** Parte 1 ***\nPuntaje del ${partida.jugador}: ${obtenerPuntaje(partida)}`);


/******************************   PARTE 2   *****************************/

function juegoRecursivo(cartasJugador1, cartasJugador2) {
    const rondasAnteriores = new Set();

    while(cartasJugador1.length > 0 && cartasJugador2.length > 0) {
        const rondaActual = `${cartasJugador1.join('-')}|${cartasJugador2.join(',')}\n`;
        let ganador;

        // caso base
        if(rondasAnteriores.has(rondaActual)) {
            return {jugador: "Jugador 1", baraja: cartasJugador1};
        }

        rondasAnteriores.add(rondaActual);

        const cartaSuperiorJ1 = cartasJugador1.shift();
        const cartaSuperiorJ2 = cartasJugador2.shift();

        // caso recursivo
        if(cartasJugador1.length >= cartaSuperiorJ1 && cartasJugador2.length >= cartaSuperiorJ2) {
            const {jugador} = juegoRecursivo(cartasJugador1.slice(0, cartaSuperiorJ1), cartasJugador2.slice(0, cartaSuperiorJ2));
            ganador = jugador;
        } else {
            ganador = cartaSuperiorJ1 > cartaSuperiorJ2 ? "Jugador 1" : "Jugador 2";
        }

        if(ganador == "Jugador 1") {
            cartasJugador1.push(cartaSuperiorJ1);
            cartasJugador1.push(cartaSuperiorJ2);
        } else {
            cartasJugador2.push(cartaSuperiorJ2);
            cartasJugador2.push(cartaSuperiorJ1);
        }
    }

    return {
        jugador: cartasJugador1.length > 0 ? "Jugador 1" : "Jugador 2",
        baraja: cartasJugador1.length > 0 ? cartasJugador1 : cartasJugador2
    };
}

const partida2 = juegoRecursivo([...cartasJugador1], [...cartasJugador2]);
console.log(`*** Parte 2 ***\nPuntaje del ${partida2.jugador}: ${obtenerPuntaje(partida2)}`);