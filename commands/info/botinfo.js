const { Command } = require("discore.js");
const { MessageEmbed } = require("discord.js");
const info = require('../../package.json')

module.exports = class extends (
  Command
) {
  get options() {
    return {
      enabled: true,
      name: "botinfo",
      cooldown: 1000, // In milliseconds
      aliases: ["infobot", "ботинфо", "bot"],
      permLevel: 0,
    };
  }
  run(message, args) {
    let embed = new MessageEmbed()
            .setColor(0xf1cc7c)
            .setDescription(`Информация о боте, разработчики и другая статистика`)
            .addField(`Версии пакетов`, `
ㆍВерсия бота ${info.version}
NeppedAPI 
ㆍВерсия: ${info.dependencies["neppedapi"]}
Discord.js
ㆍВерсия: ${info.dependencies["discord.js"]}
Discore.js 
ㆍВерсия: ${info.dependencies["discore.js"]}`)
        message.channel.send(embed)
  }

  disabledRun(message, args) {
    message.react("598495966613733376");
    let embed = new MessageEmbed()
      .setAuthor(
        `Ошибка исполнения команды`,
        `https://cdn.discordapp.com/attachments/659404951851630593/738693119020761138/cmd.png`
      )
      .setDescription(
        `Команда в данный момент недоступна по причине её отключения.`
      )
      .setColor(`#585f63`);
    message.channel.send({ embed: embed });
  }
};
