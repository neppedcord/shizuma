const { Command } = require("discore.js");
const { MessageEmbed, Message } = require("discord.js");
const superagent = require("superagent");
const asetsi = require("../../asettings/icons.json");
const { neppedapitoken } = require("../../config.json")
const nepsdk = require("neppedapi")
const nepcli = new nepsdk(neppedapitoken)
// imagesTypes = ['baka', 'cry', 'cuddle', 'happy', 'hug', 'kiss', 'sad', 'wag'];
module.exports = class extends (
  Command
) {
  get options() {
    return {
      enabled: true,
      name: "happy",
      cooldown: 2000, // In milliseconds
      aliases: ["веселяшка", "веселье"],
      permLevel: 0,
    };
  }
  async run(message, args) {
    nepcli.images("happy").then((body) => {
      message.channel.send(
        new MessageEmbed()
          .setAuthor(
            `${message.member.user.username} испытывает веселяшку`,
            asetsi.client["plus"]
          )
          .setDescription(`>W<`)
          .setImage(body.url)
          .setColor(0xeece7e)
          .setFooter(
            `Powered by NeppedCord API » https://api-docs.neppedcord.top/`,
            `${asetsi.client.neppedapi}`
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
