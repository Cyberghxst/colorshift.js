const { ColorshiftClient } = require('../src/index.js');

const bot = new ColorshiftClient({
  token: 'OTM4Mjk3MTU0Nzk4MjI3NTE4.GUVXfv.kmFfVAZZP6g6vYPH630utoSH_yxh9tQSDAr7DE',
  prefijo: '?',
  intentos: ['guilds', 'guildPresences', 'guildMessages', 'messageContent']
});
bot.loadCommands('./test/comandos');
bot.addStatus({
  text: "colorshift.js",
  type: 'compitiendo',
  status: 'dnd'
},{
  text: "ColorshiftClient",
  type: 'viendo',
  status: 'idle'
});
bot.onMessageCreate();