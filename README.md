# colorshift.js
Un conjunto de métodos listos para usar, para que no te compliques la vida haciendo un bot de Discord.
<br>Esto usa Discord.js 14 bajo el capó.
<br>En Español.
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
cliente.loadCommands('./comandos'); // Carga los archivos dentro de la carpeta comandos.
// Añadiendo estados
cliente.addStatus({
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
// Comando en archivo principal (no command handler)
cliente.newCommand({
    name: 'hola',
    type: 'basic',
    code: async d => {
        d.message.channel.send(`¡Hola ${d.message.author.username}!`);
    }
})
```
## Formato de command handler
Los comandos deben ir dentro de la carpeta que hayas declarado, para este ejemplo, usamos una carpeta llamada "comandos", los archivos dentro de ella deben tener una extensión ".js"
<br>*Inválido*
<br>`mi comando.txt`, `mi comando.json`
<br>*Válido*
<br>`mi comando.js`, `ban.js`

### Ejemplo de comando
```js
module.exports = {
    name: 'hola',
    aliases: ['ola', 'elo'],
    type: 'basic',
    code: async d => {
        d.message.channel.send(`Alo papayera, turepera conlapapaya`);
    }
}
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
### Callbacks
- onMessageCreate()
