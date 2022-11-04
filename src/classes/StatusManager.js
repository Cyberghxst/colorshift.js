const { tipoStatus } = require('../utils/constants');
const { success } = require('../utils/functions');

class StatusManager {
    constructor(client) {
        this.client = client;
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
            // Habilitando las presencias
            this.client.user.setPresence({
                activities: [{
                    name: na,
                    type: ty,
                    status: st
                }]
            });
        }, 10000)
        success('¡Presencia habilitada!')
    }
}

module.exports = StatusManager;