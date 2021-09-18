const axios = require("axios");
const _ = require('lodash');
const fs = require('fs');
const chalk = require('chalk')

/** 
1. El registro de los usuarios debe hacerse con la API Random User usando axios para
consultar la data.
*/

axios
.get("https://randomuser.me/api/")
.then((data) => {
const name = data;

/**
 * 2. Cada usuario registrado debe tener un campo id único generado por el paquete
UUID.
 */

const { v4: uuidv4 } = require('uuid')
//console.log("identificador :",uuidv4())

/**
3. Cada usuario debe tener un campo timestamp almacenando la fecha de registro
obtenida por medio d
 */

const moment = require('moment');
let tiempo =moment().subtract(10, 'days').format('MMM Do YY');

let data2 = JSON.parse(fs.readFileSync("./files/usuarios.json", 'utf8'));
const usuarios = data2;
console.log(typeof(data2));
//console.log("clientes :",usuarios);
usuarios.push({
    nombre:name.data.results[0].name.first,
    apellido:name.data.results[0].name.last,
    id:uuidv4(),
    timestamp:tiempo
});
console.log("cliente +",usuarios);

fs.writeFileSync("./files/usuarios.json", JSON.stringify(data2));
        


/** 
4. Por cada consulta realizada al servidor, se debe devolver al cliente una lista con los
datos de todos los usuarios registrados usando Lodash para recorrer el arreglo de
usuarios.
*/

let nombres = _.mapValues(usuarios, 'nombre');
console.log(nombres);
/** 
 * 5. En cada consulta también se debe imprimir por la consola del servidor la misma lista
de usuarios pero con fondo blanco y color de texto azul usando el paquete Chalk.
 */


let nombreschalk = JSON.stringify(nombres);
console.log(chalk.blue.bgWhite(`${nombreschalk}`));


})
.catch((e) => {
console.log(e);
});

