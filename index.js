let { Discord, MessageEmbed } = require("discord.js")
let c = require("./config.json")
const { Core } = require('discore.js');
new Core({
    token: c.token,
    prefix: c.prefix,
    folders: {
        commands: 'commands',
        triggers: 'triggers',
        events: 'events',
    },
    prefixOptions: {
        spaceSeparator: false, // Allow space after prefix
        ignoreCase: false, // Ignore prefix case
        mention: true,
    },
})


