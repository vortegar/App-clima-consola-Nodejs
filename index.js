require('dotenv').config();

const { inquireMenu, leerInput, listarLugares } = require("./helpers/inquire");
const Busquedas = require("./models/busquedas");

const main = async() => {
    
    const busqueda = new Busquedas();
    let opt = 0;
    busqueda.leerDB()

    do {
        
        opt = await inquireMenu()
        // if ( opt !== 0 ) await pausa();

        switch ( opt ) {

            case 1:
            
            const termino = await leerInput('Ciudad: ');
            
            // Hace la busqueda de ciudad en la API devuelve un objeto de ciudades
            const lugares = await busqueda.ciudad(termino);
            
            // formatea el objeto de ciudades dejando solo los valores importantes
            const id = await listarLugares( lugares );
            if( id === '0' ) continue;
            
            // Crea un objeto con los valores que coinsidan del array con la variable id
            const lugarSel = lugares.find( l => l.id === id );
            busqueda.agregarHistorial( lugarSel.nombre );

            const climaSitio = await busqueda.climaLugar( lugarSel.lat, lugarSel.lng );


            console.log('\nInformación de la ciudad\n'.green);
            console.log('Ciudad:', lugarSel.nombre.green);
            console.log('Lat:', lugarSel.lat);
            console.log('Lng:', lugarSel.lng);
            console.log('Temperatura:', climaSitio.temp);
            console.log('Mínima:', climaSitio.min);
            console.log('Máxima:',climaSitio.max);
            console.log('Como está el clima:', climaSitio.desc.green);
            console.log('\n');
            
            break;

            case 2: 

            console.log('\nHistorial de ciudades\n'.green);

                busqueda.historialCapitalizado.forEach( (lugar, i ) => {
                    const idx = `${ i + 1 }.`.green
                    console.log(`${ idx } ${ lugar }`)
                })

            console.log('\n');


            break
        }

        
    } while ( opt !== 0 );

}

main();