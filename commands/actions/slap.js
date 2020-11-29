const { Command } = require("discore.js");
const { MessageEmbed, Message } = require("discord.js");
const superagent = require("superagent");
const asetsi = require("../../asettings/icons.json");

module.exports = class extends (
  Command
) {
  get options() {
    return {
      enabled: true,
      name: "slap",
      cooldown: 2000, // In milliseconds
      aliases: ["ударить", "шлепок"],
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
    if (!user) return message.channel.send("Нужно найти цель.");
    if (user.user.id == message.member.id)
      return message.reply(`Хей, не бей себя.`);
    if (user.user.id == this.client.user.id)
      return message.reply(`Это же больно ;-;`);

    superagent.get(`https://nekos.life/api/v2/img/slap`).then((body) => {
      message.channel.send(
        new MessageEmbed()
          .setAuthor(
            `${message.member.user.username} применяет силу против ${user.user.username}`,
            asetsi.client["plus"]
          )
          .setDescription(`Драться не хорошо! >___<`)
          .setImage(body.body.url)
          .setColor(0xeece7e)
          .setFooter(
            `Powered by nekos.life API » https://nekos.life/`,
            `https://cdn.discordapp.com/attachments/762217988451074069/782569072181116928/nekochibi.png`
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
