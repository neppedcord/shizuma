const { Command } = require("discore.js");
const { MessageEmbed } = require("discord.js");
let { token } = require("../config.json");
let { admins } = require("../config.json");

module.exports = class extends (
  Command
) {
  get options() {
    return {
      enabled: true,
      name: "eval",
      cooldown: 1000, // In milliseconds
      aliases: ["evaluation", "eвал", "do"],
      permLevel: 0,
    };
  }
  async run(message, args) {
    if (!message.member.id.includes())
      try {
        let toEval = args.join(" "),
          isAsync = false,
          noReply = false,
          last = false;

        if (!toEval) return message.reply("bruh");

        toEval = toEval
          .replace(/(```(js)?)?/g, "")
          .replace("+async", () => {
            isAsync = true;
            return "";
          })
          .replace(/(--noreply)|(--n)/g, () => {
            noReply = true;
            return "";
          })
          .replace(/(--last)|(--l)/g, () => {
            last = true;
            return "";
          });

        if (toEval.includes("await")) isAsync = true;

        if (isAsync) toEval = "(async() => {" + toEval + "})()";

        let before = process.hrtime.bigint();
        let evaled = eval(toEval);

        if (noReply) return message.react("Отсутствует код исполнения.");

        if (require("util").types.isPromise(evaled)) evaled = await evaled;

        let after = process.hrtime.bigint();

        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);

        if (evaled === "undefined" || evaled === "null")
          return message.reply("bruh");

        if (evaled.length >= 1900) {
          if (!last) evaled = evaled.slice(0, 1900);
          else evaled = evaled.slice(evaled.length - 1900);
        }

        evaled =
          "Выполнено за " +
          (after - before) +
          " наносекунд или " +
          (parseInt(after - before) / 1000000).toFixed(3) +
          "ms\n" +
          evaled;

        if (evaled.includes(this.client.token))
          return message.reply("Token included.");

        message.reply(evaled, { code: "js", split: "\n" });
      } catch (e) {
        let err = `${e.name}\n${e.message}`;
        if (err.length >= 1980) err = err.slice(0, 1980) + "...";
        message.reply(err), { code: "js" };
      }
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
