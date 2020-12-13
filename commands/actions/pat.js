const { Command } = require("discore.js");
const { MessageEmbed, Message } = require("discord.js");
const superagent = require("superagent");
const asetsi = require("../../asettings/icons.json");

const { neppedapitoken } = require("../../config.json");
const nepsdk = require("neppedapi");
const nepcli = new nepsdk(neppedapitoken);

module.exports = class extends (
  Command
) {
  get options() {
    return {
      enabled: true,
      name: "pat",
      cooldown: 2000, // In milliseconds
      aliases: ["погладить", "глядить-глядитьня", "няшить-гладить"],
      permLevel: 0,
    };
  }
  async run(message, args) {
    let arg = args.slice(0).join(" ");
    let user = message.guild.member(
      message.mentions.users.first() ||
        message.guild.members.cache.find(
          (m) => m.user.username == arg || m.id == arg || m.displayName == arg
        )
    );
    if (!user) return message.channel.send("*в ожидании объятий*");
    if (user.user.id == message.member.id)
      return message.reply(`*а можно мне также? :>*`);
    if (user.user.id == this.client.user.id)
      return message.reply(`<a:ash_hugheart:782575078596149260>`);

    nepcli.images("pat").then((body) => {
      if(body.error) {
        message.react("598495966613733376");
        let embed = new MessageEmbed()
          .setAuthor(
            `Ошибка исполнения команды`,
            `https://cdn.discordapp.com/attachments/659404951851630593/738693119020761138/cmd.png`
          )
          .setDescription(
            `Nep-nep? \`${body.error.message}\``
          )
          .setColor(`#585f63`);
        message.channel.send({ embed: embed });
      }
      
      message.channel.send(
        new MessageEmbed()
          .setAuthor(
            `${message.member.user.username} гладит ${user.user.username}`,
            asetsi.client["plus"]
          )
          .setDescription(`Kawaaii!`)
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
