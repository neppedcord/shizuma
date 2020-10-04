const { Command } = require('discore.js');
const { MessageEmbed } = require("discord.js")

module.exports = class extends Command {
    get options() {
        return {
            enabled: false,
            name: "help",
            cooldown: 1000, // In milliseconds
            aliases: ["хелп", "помощь", "помогите"],
            permLevel: 0,
        };

    }
        run(message, args) {
                let ping = new MessageEmbed()
                    .setAuthor()
        }
    disabledRun(message, args) {
        message.react('598495966613733376')
        let embed = new MessageEmbed()
            .setAuthor(`Ошибка исполнения команды`, `https://cdn.discordapp.com/attachments/659404951851630593/738693119020761138/cmd.png`)
            .setDescription(`Команда в данный момент недоступна по причине переписи бота.`)
            .setColor(`#585f63`)
        message.channel.send({embed: embed})

    }
}
