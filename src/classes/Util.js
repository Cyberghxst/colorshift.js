const { error, success } = require('../utils/functions');
const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');
const color = require('colors');
const { execSync } = require('child_process');

class Util {
    constructor(client) {
        this.client = client
    }
    async load(dir) {
        if (!dir) return error('Directorio no fue dado a la función.')
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
        success('¡Comandos cargados!');
    }

    execute(d) {
        if (!d) return error('Codigo no provisto.')
        const execute = execSync(d).toString();
        return execute;
    }
}

module.exports = Util;