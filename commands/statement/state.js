const { Command } = require('discore.js');
const { MessageEmbed } = require("discord.js")

module.exports = class extends Command {
    get options() {
        return {
            enabled: false,
            name: "state",
            cooldown: 1000, // In milliseconds
            aliases: ["cостояние"],
            permLevel: 0,
        };

    }
        run(message, args) {
                let ping = new MessageEmbed()
                    .setAuthor(`Состояние бота и сервисa SHARP`, ``)
        }
    disabledRun(message, args) {
        message.react('598495966613733376')
        let embed = new MessageEmbed()
            .setDescription(`~~[04.10.2020] Бот неактивен~~
            [29.11.2020] Продолжается разработка бота спустя множество месяцев.`)
            .setColor(`#2f3036`)
        message.channel.send({embed: embed})

    }
}
