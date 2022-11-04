// Módulos
const { ChannelType, Client, Collection, Partials } = require('discord.js');
const discord = require('discord.js');
const { Intentos } = require('../utils/constants');
const { error, success } = require('../utils/functions');
const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');
const color = require('colors');
// Importando el status manager
const StatusManager = require('./StatusManager');

class ColorshiftClient {
    constructor(options) {
        // Opciones del cliente
        this.prefijo = options.prefijo
        this.token = options.token
        this.intentos = options.intentos
        // Contexto
        // Validando el token
        if (typeof(this.token) !== 'string') return error(`Token inválido provisto en: ${this.token}`);
        // Validando el o los prefijos
        if (typeof(this.prefijo) !== 'string') return error(`Prefijo inválido provisto en: ${this.prefijo}`);
        // Validando el formato de intentos
        if (!Array.isArray(this.intentos)) return error(`Formato de intentos inválido en: ${this.intentos}`);
        // Conversión de intentos en formato string a BitField
        const newIntents = this.intentos.map(i => Intentos[i]);
        // Iniciando un nuevo cliente
        const client = new Client({
            intents: newIntents,
            partials: Object.values(Partials)
        });
        this.client = client
        // Iniciando una instancia del StatusManager
        const status = new StatusManager(client);
        // Datos del cliente
        this.data = {
            commands: new Collection(), // Colección (map) de comandos.
            statuses: [] // Array vacío para pushear los estados.
        }
        const arrStatus = this.data.statuses;
        client.login(this.token); // Iniciar sesión en el cliente.
        // Evento 'ready'
        client.on('ready', async () => {
            status.enable(arrStatus);
            success(`¡Sesión iniciada en ${client.user.tag}!`); // Mensaje de sesión iniciada.
            success(`versión ${require('../../package.json').version}`); // Versión del paquete.
            success(`basada en Discord.js ${discord.version}`)
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

    /*
        Main file command
    */
    // newCommand
    newCommand(...properties) {
        for (const option of properties) {
            this.data.commands.set(option.name, option);
            console.log(`|-> ${option.name}`, color.green('cargado.'));
            console.log('|-----------------------------------------------------------------|');
        }
    }

    /*
        Callbacks
    */

    // messageCreate callback
    // messageCreate callback
    onMessageCreate() {
        this.client.on('messageCreate', message => {
            const prefix = this.prefijo;
            const client = this.client;
            if(message.author.bot || message.channel.type === ChannelType.Dm) return;
            const commands = this.data.commands;
            if(!message.content.toLowerCase().startsWith(prefix)) return;
            const args = message.content.slice(prefix.length).trim().split(/ +/)
            const probably = args.shift()?.toLowerCase()
            const command = commands.find(cmd => cmd.name === probably || cmd.aliases && cmd.aliases.includes(probably))
            if(!command) return
            const d = { args, client, message, prefix }
            if(command.args && command.args > args.length) return message.reply('Invalid usage')
            command.code(d)
        });
    }
}

module.exports = ColorshiftClient;