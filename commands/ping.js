const { Command } = require("discore.js");
const { MessageEmbed } = require("discord.js");
let agent = require("superagent");
const asetsc = require("../asettings/colors.json");
const asetsi = require("../asettings/icons.json");
const asetse = require("../asettings/emojis.json");

module.exports = class extends Command {
  get options() {
    return {
      enabled: true,
      name: "ping",
      cooldown: 1000, // In milliseconds
      aliases: ["пинг", "latency", "задержка"],
      permLevel: 0,
    };
  }
  async run(message, args) {
    let status = 0;
    let ping = Math.floor(this.client.ws.ping);
    let part = "Неизвестное состояние";
    if (ping < "300") {
      part == "Стабильное состояние";
    }
    if (ping == "300" || (ping > "300" && ping < "600")) {
      part == "Имеется задержка";
    }
    if (ping > "600") {
      part == "Состояние критическое";
    }
    let embed = new MessageEmbed();
    ping < 100
      ? (status += 2)
      : ping > 100 && ping < 1000
      ? (status += 1)
      : (status += 0);
    embed.setAuthor(`Задержка системы бота`, `${asetsi.client.robot}`);
    embed.setDescription(`${part} | ${ping}ms. `);
    let res = await agent.get("https://status.discord.com/index.json");
    let comps = "";
    res.body.components.forEach((comp) => {
      comp.status == "operational"
        ? (status += 2)
        : comp.status == "partial_outage"
        ? (status += 1)
        : (status += 0);
      comps += `${
        comp.status == "operational"
          ? asetse.status.online
          : comp.status == "partial_outage"
          ? asetse.status.idle
          : asetse.status.dnd
      } ${comp.name}\n`;
    });
    embed.addField(
      `${asetse.discord} Работоспособность систем Дискорда`,
      `
${
  res.body.status.description
    ? "Все системы работают исправно"
    : "Имеются проблемы в работоспособности систем"
}
${comps}`
    );

    let colors = ["#f04747", "#ffc800", "#5abd90"];
    embed.setColor(asetsc.client.main);
    message.channel.send({ embed: embed });
  }
  disabledRun(message, args) {
    message.react("598495966613733376");
    let embed = new MessageEmbed()
      .setAuthor(`Ошибка исполнения команды`, asetsi.icons_oth["cmd.icon"])
      .setDescription(
        `Команда в данный момент недоступна по причине отключения разработчиком.`
      )
      .setColor(asets.client.main);
    message.channel.send({ embed: embed });
  }
};
