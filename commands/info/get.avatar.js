const { Command } = require("discore.js");
const { MessageEmbed } = require("discord.js");

module.exports = class extends (
  Command
) {
  get options() {
    return {
      enabled: true,
      name: "avatar",
      cooldown: 1000, // In milliseconds
      aliases: ["get.avatar", "аватарка", "получить.аву"],
      permLevel: 0,
    };
  }
  run(message, args) {
    let arg = args.slice(0).join(" ");
    let user =
      message.guild.member(
        message.mentions.users.first() ||
          message.guild.members.cache.find(
            (m) => m.user.username == arg || m.id == arg || m.displayName == arg
          )
      ) || message.member;
    let description = `Форматы изображения: [PNG](${user.user.avatarURL({
      format: "png",
      size: 4096,
    })}), [JPG](${user.user.avatarURL({
      format: "jpg",
      size: 4096,
    })}), [JPEG](${user.user.avatarURL({
      format: "jpeg",
      size: 4096,
    })}), [WEBP](${user.user.avatarURL({ format: "webp", size: 4096 })})`;

    let embed = new MessageEmbed()
      .setColor(0xeece7e)
      .setAuthor(`Аватарка пользователя ${user.user.username}`);
    if (user.user.avatarURL({ dynamic: true }).includes(".gif")) {
      embed.setImage(user.user.avatarURL({ format: "gif", size: 4096 }));
      description += `, [GIF](${user.user.avatarURL({
        format: "gif",
        size: 4096,
      })})`;
    } else {
      embed.setImage(user.user.avatarURL({ format: "png", size: 4096 }));
    }
    embed.setDescription(description);
    message.channel.send(embed);
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
