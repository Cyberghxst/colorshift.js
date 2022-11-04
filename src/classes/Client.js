// Módulos
const { Client, Collection, Partials } = require('discord.js');
const { Intentos, tipoStatus } = require('../utils/constants');
const { error, success } = require('../utils/functions');
const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');
const colors = require('colors');
// Importando el status manager
const StatusManager = require('./StatusManager');

class ColorshiftClient {
    constructor(options) {
        // Opciones del cliente
        const {
            token,
            prefijo,
            intentos
        } = options;
        // Validando el token
        if (typeof(token) !== 'string') return error(`Token inválido provisto en: ${token}`);
        // Validando el o los prefijos
        if (typeof(prefijo) !== 'string') return error(`Prefijo inválido provisto en: ${prefijo}`);
        // Validando el formato de intentos
        if (!Array.isArray(intentos)) return error(`Formato de intentos inválido en: ${intentos}`);
        // Conversión de intentos en formato string a BitField
        const newIntents = intentos.map(i => Intentos[i]);
        // Iniciando un nuevo cliente
        const client = new Client({
            intents: newIntents,
            partials: Object.values(Partials)
        });
        // Iniciando una instancia del StatusManager
        const status = new StatusManager(client);
        // Datos del cliente
        this.data = {
            commands: new Collection(), // Colección (map) de comandos.
            statuses: [] // Array vacío para pushear los estados.
        }
        const arrStatus = this.data.statuses;
        client.login(token); // Iniciar sesión en el cliente.
        // Evento 'ready'
        client.on('ready', async () => {
            status.enable(arrStatus);
            success(`¡Sesión iniciada en ${client.user.tag}!`); // Mensaje de sesión iniciada.
            success(`${require('../../package.json').version}`); // Versión del paquete.
        })
    }
    /*
        Métodos de la clase
    */

    // Añadir estados
    addStatus(...options) {
        // Opciones del método.
        const {
            text,
            type,
            url,
            time,
            status
        } = options;
        // Mapeo de los parámetros dados por el usuario.
        options.map(s => {
            let Text = s.text;
            let Type = s.type;
            let Url = s.url;
            let Time = s.time;
            let Status = s.status;
            // Array de las opciones.
            const q = { Text, Type, Url, Time, Status }
            // Pusheo de las opciones a la data del cliente.
            this.data.statuses.push(q);
        });
    }

    // Command handler
    loadCommands(dir) {
        let mdir = process.cwd();
        let modules = readdirSync(join(mdir, dir));
        let index = 0;
        for (const file of modules) {
            if (lstatSync(join(mdir, dir, file)).isDirectory()) {
                this.loadCommands(join(dir, file));
                continue;
            }
            delete require.cache[join(mdir, dir, file)]
            let comando = require(join(mdir, dir, file));
            if (!comando) continue;
            if (index === 0) console.log('|-----------------------------------------------------------------|');
            index++
            console.log(`|-> ${comando.name}`, color.green('cargado.'));
            console.log('|-----------------------------------------------------------------|');
            this.data.commands.set(comando.name, comando);
        }
    }
}

module.exports = ColorshiftClient;