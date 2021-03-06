const Discord = require("discord.js");
const { stripIndent } = require("common-tags");
const moment = require("moment");
const cpu = require("cpu-stat");
const ms = require("ms");
const { convert_bytes } = new (require("../main"))(new Discord.Client(), {
  discord: Discord,
  config: require("../config.json"),
});

exports.run = async (client, message, args) => {
  cpu.usagePercent((error, percents, seconds) => {
    let bs = stripIndent(`
        Bot Uptime: ${ms(client.uptime)}
        Bot Created: ${moment.utc(client.user.createdAt).format("ll")}
        Discord.js Version: ${require("../package.json").dependencies["discord.js"] || "n/a"}
        `);

    let ss = stripIndent(`
        Memory Usage: ${convert_bytes(process.memoryUsage().heapUsed)} 
        CPU Usage: ${percents.toFixed(2)} %
        Node.js Version: ${process.version}
        `);

    const embed = new Discord.MessageEmbed()
      .setAuthor("GTPS Auto Backup Discord Bot")
      .setColor("RANDOM")
      .addField("Bot Stats: ", "```" + bs + "```", true)
      .addField("System Stats: ", "```" + ss + "```", true)
      .addField(
        "Bot Github (Open Source): ",
        "[Source](https://github.com/SadesXD/GTPS-Auto-Backup-Discord-Bot)"
      )
      .setTimestamp();
    return message.channel.send(embed);
  });
};
