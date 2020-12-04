const { Command } = require("discore.js");
const { MessageEmbed, Message } = require("discord.js");
const superagent = require("superagent");
const asetsi = require("../../asettings/icons.json");
const { neppedapitoken } = require("../../config.json")
const nepsdk = require("neppedapi-js")
const nepcli = new nepsdk(neppedapitoken)

module.exports = class extends (
  Command
) {
  get options() {
    return {
      enabled: true,
      name: "wag",
      cooldown: 2000, // In milliseconds
      aliases: ["вилять", "вилять-хвостиком"],
      permLevel: 0,
    };
  }
  async run(message, args) {
    nepcli.images("wag").then((body) => {
      message.channel.send(
        new MessageEmbed()
          .setAuthor(
            `${message.member.user.username} виляет хвостиком`,
            asetsi.client["plus"]
          )
          .setDescription(`>W<`)
          .setImage(body.url)
          .setColor(0xeece7e)
          .setFooter(
            `Powered by NeppedCord API » https://api-docs.neppedcord.top/`,
            `https://media.discordapp.net/attachments/762217988451074069/784404416191004692/neppedcordapi.png`
          )
      );
    });
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
