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
      name: "kiss",
      cooldown: 2000, // In milliseconds
      aliases: ["сосаться", "целоваться", "няшится"],
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
    if (!user)
      return message.channel.send(
        "*А-аа... А мне можно? <:NC_YuriShy:645325652085440525>*"
      );
    if (user.user.id == message.member.id)
      return message.reply(`Мне кажется, ты хочешь сделать что то странное?`);
    if (user.user.id == this.client.user.id)
      return message.reply(`<:NC_plutiahappy:764746358736683048>`);

    superagent.get(`https://nekos.life/api/v2/img/kiss`).then((body) => {
      message.channel.send(
        new MessageEmbed()
          .setAuthor(
            `${message.member.user.username} уверенно целуется с ${user.user.username}`,
            asetsi.client["plus"]
          )
          .setDescription(`Как неловка >~<`)
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
