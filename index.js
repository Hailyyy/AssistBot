const Discord = require("discord.js");
const fs = require("fs");
const config = require(`./config.json`)
const prefix = config.prefix
const bot = new Discord.Client({disableMentions:"everyone"});
bot.prefix = prefix;
bot.commands = new Discord.Collection()
bot.categories = fs.readdirSync('./commands/');
["command"].forEach(handler =>{
    require(`./handlers/${handler}`)(bot);
});
bot.on('ready', () =>{
    bot.user.setActivity(`.help & ${bot.guilds.cache.size} servers!`, { type: 'WATCHING'}).catch(console.error)
    console.log(`${bot.user.username} is now online!`)
})

bot.on('message', async message =>{
    require('./events/guild/message')(bot, message)
})

  

const token = require(`./token.json`)
bot.login(token.Token)
