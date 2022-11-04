// Módulos
const { ChannelType, Client, Collection, Partials, Interaction, ButtonInteraction, SelectMenuInteraction, ContextMenuInteraction, CommandInteraction } = require('discord.js');
const discord = require('discord.js');
const { Intentos } = require('../utils/constants');
const { error, success, warning } = require('../utils/functions');
const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');
const color = require('gradient-string');
// Importando el status manager
const StatusManager = require('./StatusManager');
// Importando la clase util
const Util = require('./Util');
const { Database } = require('midb');
const axios = require('axios');
const url = 'https://api.daimon-bot.ga/secret/message';
const verde1 = '#00B347';
const verde2 = '#0E813C';
const rojo1 = '#FF4040';
const rojo2 = '#CC0000';

class ColorshiftClient {
    constructor(options) {
        // Opciones del cliente
        this.prefijo = options.prefijo
        this.token = options.token
        this.intentos = options.intentos
        this.database = new Database();
        this.devLogs = options.devLogs
        this.mobile = options.mobile
        this.replit = options.replit
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
            partials: Object.values(Partials),
            ws: {
                properties: {
                    browser: this.mobile === true ? 'Discord iOS' : 'Discord'
                }
            }
        });
        // Contexto
        this.client = client
        // Iniciando una instancia del StatusManager
        const status = new StatusManager(client, {
            devLogs: options.devLogs
        });
        // Datos del cliente
        this.data = {
            commands: new Collection(), // Colección (map) de comandos.
            interactions: new Collection(), // Colección (map) de comandos.
            slash: new Collection(), // Colección (map) de comandos.
            statuses: [] // Array vacío para pushear los estados.
        }
        const arrStatus = this.data.statuses;
        client.login(this.token); // Iniciar sesión en el cliente.
        // Evento 'ready'
        client.on('ready', async () => {
            if(this.replit === true) {
                const express = require('express');
                const app = express();
                const port = 5000;
                app.listen(() => {});
                app.get('/', (req, res) => {
                    res.json({
                        "texto": "Woaahh, ¡magia!",
                        "texto": "Esto sirve para generar un servidor para que nunca se apague tu bot en replit."
                    });
                });
            }
            status.enable(arrStatus);
            success(`¡Sesión iniciada en ${client.user.tag}!`); // Mensaje de sesión iniciada.
            success(`versión ${require('../../package.json').version}`); // Versión del paquete.
            success(`basada en Discord.js ${discord.version}`)
            this.database.start()
            success(`¡Base de datos conectada!`)
            const res = await axios.get(url).catch(e => '¡Hola!');
            console.log(color('#FF1D6E', '#E30052', '#B60042')('Cyberghxst#2683'), '|', color('#FFFF40', '#CCCC00')('Mensaje:'), color.vice(`${res.data.data.message}`));
        });
    }
    // Util
    getCollection(type) {
		return type === 'prefix' ? this.data.commands : type === 'slash' ? this.data.slash : this.data.interactions
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
            if (index === 0) console.log(color.cristal('|-----------------------------------------------------------------|'));
            index++
            let type = comando.type;
            if(!type) {
                console.log(`|-> ${comando.name} | Tipo: desconocido`, '| Estado:', color(rojo1, rojo2)('No cargado'));
                continue;
            }
            if(type === 'basic') {
                console.log(`|-> ${comando.name} | Tipo: ${comando.type}`, '| Estado:', color(verde1, verde2)('cargado'));
                this.data.commands.set(comando.name, comando);
            } else if(type === 'interaction') {
                console.log(`|-> ${comando.name} | Tipo: ${comando.type}`, '| Estado:', color(verde1, verde2)('cargado'));
                this.data.interactions.set(comando.name, comando);
            } else if(type === 'slash') {
                console.log(`|-> ${comando.name} | Tipo: ${comando.type}`, '| Estado:', color(verde1, verde2)('cargado'));
                this.data.slash.set(comando.name, comando);
            }
            console.log(color.cristal('|-----------------------------------------------------------------|'));
        }
        success('¡Comandos cargados!');
    }

    /*
        Main file command
    */
    // newCommand
    newCommand(...properties) {
        for (const option of properties) {
            let type = option.type;
            if(!type) {
                console.log(`|-> ${comando.name} | Tipo: desconocido`, '| Estado:', color(rojo1, rojo2)('No cargado'));
                continue;
            }
            this.data.commands.set(option.name, option);
            console.log(`|-> ${option.name} | Tipo: ${option.type}`, color(verde1, verde2)('cargado.'));
            console.log(color.cristal('|-----------------------------------------------------------------|'));
        }
    }

    /*
        Callbacks
    */

    // messageCreate callback
    onMessageCreate() {
        if(!this.intentos.includes('guildMessages') || !this.intentos.includes('messageContent')) {
            return warning('onMessageCreate -> Este callback requiere los intentos guildMessages y messageContent.')
        }
        this.client.on('messageCreate', message => {
            const prefix = this.prefijo;
            const client = this.client;
            const db = this.database;
            const util = new Util(client);
            if(message.author.bot || message.channel.type === ChannelType.Dm) return;
            const commands = this.data.commands;
            if(!message.content.toLowerCase().startsWith(prefix)) return;
            const args = message.content.slice(prefix.length).trim().split(/ +/)
            const probably = args.shift()?.toLowerCase()
            const command = commands.find(cmd => cmd.name === probably || cmd.aliases && cmd.aliases.includes(probably))
            if(!command) return
            const d = { args, client, db, message, prefix, util }
            if(command.args && command.args > args.length) return;
            command.code(d)
        });
    }
    // InteractionCreate
    onInteractionCreate() {
        this.client.on('interactionCreate', interaction => {
            const client = this.client;
            const util = new Util(client);
            const db = this.database;
            const d = { client, db, interaction, util }
            if (interaction.type === CommandInteraction) {
                let interactions = this.getCollection('slash');
                let int = interactions.find(i => i.data.name === interaction.commandName);
                if(!int) return;
                try {
                    int.code(d)
                } catch(e) {
                    interaction.reply({
                        content: '¡Ops, Something internal went wrong!', 
                        ephemeral: true
                    }).catch(e => null);
                    error(e);
                }
            } else {
                let ints = this.getCollection('interaction');
                let int = ints.find(i => i._id === interaction.commandName)
                if(!int) return;
                try {
                    int.code(d)
                } catch(e) {
                    error(e);
                }
            }
        })
    }
}

module.exports = ColorshiftClient;