const { tipoStatus } = require('../utils/constants');
const { developmentLog, success } = require('../utils/functions');

class StatusManager {
    constructor(client, options) {
        this.client = client;
        this.devLogs = options.devLogs
    }
    // Habilitar estados
    enable(arr) {
        const statuses = arr;
        const texts = statuses.map(t => t.Text);
        const types = statuses.map(t => tipoStatus[t.Type]);
        const urls = statuses.map(t => t.Url);
        const status = statuses.map(t => t.Status);
        let index = -1;
        // Loop
        setInterval(() => {
            if (index >= (statuses.length - 1)) {
                index = 0;
            } else {
                index++
            }
            const na = texts[index]
            const ty = types[index]
            const st = status[index]
            const link = urls[index]
            if(this.devLogs == true) developmentLog(`[StatusManager :: HEARTBEAT] Index: ${index} Nombre: ${na}, Tipo: ${ty}, Estado: ${st}`);
            // Habilitando las presencias
            this.client.user.setPresence({
                activities: [{
                    name: na,
                    type: ty,
                    status: st
                }]
            });
        }, 60000)
        success('¡Presencia habilitada!')
    }
}

module.exports = StatusManager;