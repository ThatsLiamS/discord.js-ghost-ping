const fs = require('fs');
const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({
	intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_EMOJIS_AND_STICKERS', 'GUILD_WEBHOOKS'],
});

client.snipes = new Discord.Collection();
client.text_commands = new Discord.Collection();

const eventFiles = fs.readdirSync(`${__dirname}/events`).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`${__dirname}/events/${file}`);
	if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
	else client.on(event.name, (...args) => event.execute(...args, client));
}

client.login(process.env['TOKEN']);