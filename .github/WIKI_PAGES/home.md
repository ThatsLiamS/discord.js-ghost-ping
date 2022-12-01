<div align='center' >
	<a href='https://npmjs.com/package/discord.js-ghost-ping'><img src='https://img.shields.io/npm/v/discord.js-ghost-ping.svg?maxAge=3600' alt='Verison' ></a>
	<a href='https://npmjs.com/package/discord.js-ghost-ping'><img src='https://img.shields.io/npm/dt/discord.js-ghost-ping.svg?maxAge=3600' alt='Downloads' ></a>
	<a href='https://npmjs.com/package/discord.js-ghost-ping'><img src='https://img.shields.io/bundlephobia/minzip/discord.js-ghost-ping.svg?maxAge=3600' alt='npm bundle size'></a>
</div>

# **Wiki**

### **About**

[**`discord.js-ghost-ping`**](https://npmjs.com/package/discord.js-ghost-ping) is a [Node.js](https://nodejs.org/en/) module that allows you to detect **ghost pings** inside of [**discord.js v14**](https://www.npmjs.com/package/discord.js)!

This package comes from the developer of verified bots: [**@Coin Flipper#1767 - 650k users**](https://discord.com/api/oauth2/authorize?client_id=668850031012610050&permissions=388160&scope=bot%20applications.commands) and [**@autoMod#8328 - 55k users**](https://automod.liamskinner.co.uk/invite)

### Example Usage

```js
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.GuildMessages] });

const GhostPing = require('discord.js-ghost-ping');

client.on('messageDelete', (...args) => {
	GhostPing('messageDelete', ...args)
		.then((result) => {
			/* Format message to send */
		})
		.catch(() => void);
});

client.on('messageUpdate', (...args) => {
	GhostPing('messageUpdate', ...args)
		.then((result) => {
			/* Format message to send */
		})
		.catch(() => void);
});

client.login(process.env['MyToken']);
```

### help

If you don't understand something in the [**`documentation`**](https://github.com/ThatsLiamS/discord.js-ghost-ping/wiki), you are experiencing problems, or you just need a gentle nudge in the right direction, please don't hesitate to join our [**`Discord Server`**](https://discord.gg/2je9aJynqt).
