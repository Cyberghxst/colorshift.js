const { ActivityType, GatewayIntentBits } = require('discord.js');

const Intentos = { 
    guilds: GatewayIntentBits.Guilds, 
    guildMembers: GatewayIntentBits.GuildMembers, 
    guildBans: GatewayIntentBits.GuildBans, 
    guildEmojisAndStickers: GatewayIntentBits.GuildEmojisAndStickers, 
    guildIntegrations: GatewayIntentBits.GuildIntegrations, 
    guildWebhooks: GatewayIntentBits.GuildWebhooks, 
    guildInvites: GatewayIntentBits.GuildInvites, 
    guildVoiceStates: GatewayIntentBits.GuildVoiceStates, 
    guildPresences: GatewayIntentBits.GuildPresences, 
    guildMessages: GatewayIntentBits.GuildMessages, 
    guildMessageReactions: GatewayIntentBits.GuildMessageReactions, 
    guildMessageTyping: GatewayIntentBits.GuildMessageTyping, 
    directMessages: GatewayIntentBits.DirectMessages, 
    directMessageReactions: GatewayIntentBits.DirectMessageReactions, 
    directMessageTyping: GatewayIntentBits.directMessageTyping,
    messageContent: GatewayIntentBits.MessageContent
};

const tipoStatus = {
    jugando: ActivityType.Playing,
    viendo: ActivityType.Watching,
    escuchando: ActivityType.Listening,
    compitiendo: ActivityType.Competing,
    transmitiendo: ActivityType.Streaming
  };

const pkgName = 'Colorshift';

module.exports = {
    Intentos,
    tipoStatus,
    pkgName
};