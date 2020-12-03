const { Command } = require("discore.js");
const m = require("moment");
const { MessageEmbed } = require("discord.js");
const asetsi = require("../../asettings/icons.json");
const asetse = require("../../asettings/emojis.json");
m.locale("ru");

module.exports = class extends (
  Command
) {
  get options() {
    return {
      enabled: true,
      name: "serverinfo",
      cooldown: 1000, // In milliseconds
      aliases: ["server", "server-info", "сервер", "серверинфо", "сервер-инфо"],
      permLevel: 0,
    };
  }
  run(message, args) {
    const map = {
      europe: "Европа ",
      singapore: "Сингапур",
      russia: "Россия",
      "us-west": "CША (Запад)",
      "us-east": "США (Восток)",
      "us-central": "США (Центр)",
      "us-south": "США (Юг)",
      southafrica: "Южная Африка",
      japan: "Япония",
      hongkong: "Хонг Конд",
      sydney: "Сидни",
      brazil: "Бразилия",
      india: "Индия",
    };
    const map01 = {
      europe: ":flag_eu:",
      singapore: ":flag_sg:",
      russia: ":flag_ru:",
      "us-west": ":flag_us:",
      "us-east": ":flag_us:",
      "us-central": ":flag_us:",
      "us-south": ":flag_us:",
      southafrica: ":flag_za:",
      japan: ":flag_jp:",
      hongkong: ":flag_hk:",
      sydney: ":flag_au:",
      brazil: ":flag_br:",
      india: ":flag_in:",
    };

    const map1 = {
      NONE: "отсутствует",
      LOW: "низкий",
      MEDIUM: "средний",
      HIGH: "высокий",
      VERY_HIGH: "максимальный",
    };

    let user = message.member;
    let onlinecount =
      message.guild.memberCount -
      message.guild.members.cache.filter(
        (m) => m.user.presence.status == "offline"
      ).size;
    let embed = new MessageEmbed()
      .setColor(0xeece7e)
      .setTitle(`Интенты временно не работают. Ожидаем верификацию.`)
      .setThumbnail(message.guild.iconURL({ size: 512, type: "gif" }))
      .setAuthor(
        `Владелец сервера ${message.guild.owner}`,
        asetsi.client["owner"]
      )
      .setImage(message.guild.bannerURL({ size: 4096, type: "png" }));
    if (
      (user.presence.clientStatus &&
        user.presence.clientStatus.desktop &&
        !user.presence.clientStatus.mobile) ||
      (user.presence.clientStatus &&
        user.presence.clientStatus.web &&
        !user.presence.clientStatus.mobile)
    ) {
      embed.addField(
        `⠀⠀⠀⠀⠀`,
        `${asetse.member} Участников ${message.guild.memberCount}
${asetse.member} Людей ${
          message.guild.memberCount -
          message.guild.members.cache.filter((m) => m.user.bot).size
        }
${asetse.bot} Ботов ${
          message.guild.members.cache.filter((m) => m.user.bot).size
        }`,
        true
      );
      embed.addField(
        `⠀⠀⠀⠀⠀`,
        `${map01[message.guild.region]} Регион ${map[message.guild.region]}
${asetse.role} ${message.guild.roles.cache.size} ролей
${asetse.heart} ${message.guild.emojis.cache.size} эмодзи`,
        true
      );
      embed.addField(`⠀`, `⠀`, true);
      embed.addField(
        `⠀⠀⠀⠀⠀`,
        `${asetse.puzzle} Уровень проверки ${
          map1[message.guild.verificationLevel]
        }
${asetse.time} Дата создания сервера (GMT+3)
⠀⠀${m(new Date(message.guild.createdAt)).format("Do MMMM YYYY [год] LTS")}`,
        false
      );
      embed.addField(
        `⠀⠀⠀⠀⠀`,
        `${asetse.status.online} ${
          message.guild.members.cache.filter(
            (m) => m.user.presence.status == "online"
          ).size
        } онлайн
${asetse.status.idle} ${
          message.guild.members.cache.filter(
            (m) => m.user.presence.status == "idle"
          ).size
        } не активны`,
        true
      );
      embed.addField(
        `⠀⠀⠀⠀⠀`,
        `${asetse.status.dnd} ${
          message.guild.members.cache.filter(
            (m) => m.user.presence.status == "dnd"
          ).size
        } DND
        ${asetse.status.offline} ${
          message.guild.members.cache.filter(
            (m) => m.user.presence.status == "offline"
          ).size
        } оффлайн`,
        true
      );
      embed.addField(
        `⠀⠀⠀⠀⠀`,
        `${asetse.gift} Платные привилегии *скоро*
Где фишки? А не знаю.
Спасибо за использование Shizuma`,
        false
      );
    }


    if ( user.presence.clientStatus &&
      user.presence.clientStatus.mobile
    ) {
      embed.addField(
        `${asetse.member} Участников ${message.guild.memberCount}`,
        `${asetse.member} Людей ${
          message.guild.memberCount -
          message.guild.members.cache.filter((m) => m.user.bot).size
        }
${asetse.bot} Ботов ${
          message.guild.members.cache.filter((m) => m.user.bot).size
        }`,
        false
      );
      embed.addField(
        `${map01[message.guild.region]} Регион ${map[message.guild.region]}`,
        `${asetse.role} ${message.guild.roles.cache.size} ролей
${asetse.heart} ${message.guild.emojis.cache.size} эмодзи`,
        false
      );
      embed.addField(
        `${asetse.puzzle} Уровень проверки ${
          map1[message.guild.verificationLevel]
        }`,
        `${asetse.time} Дата создания сервера (GMT+3)
⠀⠀${m(new Date(message.guild.createdAt)).format("Do MMMM YYYY [год] LTS")}`,
        false
      );
      embed.addField(
        `${asetse.member} ${onlinecount} общий онлайн`,
        `${asetse.status.online} ${
          message.guild.members.cache.filter(
            (m) => m.user.presence.status == "online"
          ).size
        } онлайн
${asetse.status.idle} ${
          message.guild.members.cache.filter(
            (m) => m.user.presence.status == "idle"
          ).size
        } не активны
        ${asetse.status.dnd} ${
          message.guild.members.cache.filter(
            (m) => m.user.presence.status == "dnd"
          ).size
        } DND
        ${asetse.status.offline} ${
          message.guild.members.cache.filter(
            (m) => m.user.presence.status == "offline"
          ).size
        } оффлайн`,
        true
      );
      embed.addField(
        `${asetse.gift} Платные привилегии *скоро*`,
        `Где фишки? А не знаю.
Спасибо за использование Shizuma`,
        false
      );
      embed.setFooter(`Проведена оптимизация под телефон для ${message.author.name}`, `${asetsi.telephone}`)
    }

    message.channel.send(`Информация сервера ${message.guild.name}`, {
      embed: embed,
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
