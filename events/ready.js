const { Event } = require("discore.js");
const pkg = require("../package.json");

module.exports = class extends (
  Event
) {
  get options() {
    return {};
  }

  run() {
    console.log(`AUTH | Авторизация приложения....`);
    console.log(`AUTH | Имя приложения: ${this.client.user.username}
    AUTH | ID: ${this.client.user.id}
    AUTH | Версия: ${pkg.version}
    AUTH | Версия Discord.js ${pkg.dependencies["discord.js"]}
    AUTH | Версия Discore.js ${pkg.dependencies["discore.js"]}`);
    this.client.user.setPresence({
      activity: {
        name: `Разработка продолжается | s.state | ${this.client.guilds.cache.size} Серверов | ${this.client.users.cache.size} участников`,
        type: "WATCHING",
      },
    });
  }
};
