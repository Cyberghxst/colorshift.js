# colorshift.js
Un conjunto de métodos listos para usar, para que no te compliques la vida haciendo un bot de Discord.
<br> Esto usa Discord.js 14 bajo el capó.
<br> En Español.
<br>> Se sugieren conocimientos básicos de JavaScript.

## Instalación
`npm i colorshift.js`
## Configuración básica
```js
// Invocando la clase del cliente.
const { ColorshiftClient } = require('colorshift.js');
// Instanciando la clase del cliente.
const cliente = new ColorshiftClient({
    token: 'TOKEN DEL BOT',
    prefijo: 'PREFIJO DEL BOT',
    intentos: ['INTENTOS', 'EN', 'ARRAY'] // Ver intentos disponibles en extras.
});
// Habilitando el command handler
client.loadCommands('./comandos'); // Carga los archivos dentro de la carpeta comandos.
// Añadiendo estados
client.addStatus({
    text: 'Colorshift.js',
    type: 'viendo', // Ver tipos de actividad en extras.
    status: 'online' // Ver tipos de estado en extras.
},{
    text: 'Paquete en construcción.',
    type: 'viendo',
    status: 'online'
});
// Callback para habilitar el recibo de mensajes al cliente.
cliente.onMessageCreate(); // Ver callbacks en extras.
```
> Este paquete puede contener bugs, porfavor, no usarlo para sus bots principales.
## Extras
### Intentos
- guilds
- guildMembers
- guildBans
- guildEmojisAndStickers
- guildIntegrations
- guildWebhooks
- guildInvites
- guildVoiceStates
- guildPresences
- guildMessages
- guildMessageReactions
- guildMessageTyping
- directMessages
- directMessageReactions
- directMessageTyping
- messageContent
### Tipos de actividad
- jugando
- viendo
- escuchando
- compitiendo
- transmitiendo
### Tipos de estado
Se utilizan los mismos que Discord.js (No renombrados).
- online
- idle
- dnd
- invisible
