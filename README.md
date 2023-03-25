<div align='center' >
	<a href='https://npmjs.com/package/discord.js-ghost-ping'><img src='https://img.shields.io/npm/v/discord.js-ghost-ping.svg?maxAge=3600' alt='Verison' ></a>
	<a href='https://npmjs.com/package/discord.js-ghost-ping'><img src='https://img.shields.io/npm/dt/discord.js-ghost-ping.svg?maxAge=3600' alt='Downloads' ></a>
	<a href='https://npmjs.com/package/discord.js-ghost-ping'><img src='https://img.shields.io/bundlephobia/minzip/discord.js-ghost-ping.svg?maxAge=3600' alt='npm bundle size'></a>
</div>

# ❯ **Getting Started** 

- [About](#-about)
- [Help](#-help)
- [Installation](#-installation)
- [Example usage](#-example-usage)

# ❯ **About**

Introducing a powerful new tool for Discord bot developers: the **Ghost Ping Detector**! Designed by a 4-time verified bot developer, reaching millions of users across Discord, this package is the ultimate solution for detecting and alerting users to ghost pings.

With the Ghost Ping Detector, your bot can quickly and easily detect when a user has been ghost pinged in a channel. Whenever a recent message with a mention has been deleted, the Ghost Ping Detector will immediately alert your bot, so you can provide a helpful message letting them know that they were ghost pinged.

This package is easy to install and integrate into your existing Discord bot, and is compatible with all major DiscordJS versions. Whether you're a seasoned bot developer or just getting started, the Ghost Ping Detector is the perfect tool to help you create a better, more responsive bot that users will love.

So why wait? Install the Ghost Ping Detector today and take your Discord bot to the next level!


# ❯ **Help**  

For more information on how to use the package, please refer to the complete documentation on the [repository wiki](https://github.com/ThatsLiamS/discord.js-ghost-ping/wiki) pages. If you have any questions or run into any issues, we also have a [Discord server](https://discord.gg/2je9aJynqt) where you can ask the community and the developer for help.

# ❯ **Installation** 

Install with [npm](https://www.npmjs.com/):
```
$ npm install discord.js-ghost-ping
```

Install with [yarn](https://yarnpkg.com/):
```
$ yarn add discord.js-ghost-ping
```


# ❯ **Example Usage** 

 This is a working example.
```js
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

const GhostPing = require('discord.js-ghost-ping');

client.on('messageDelete', (...args) => {
	const res = GhostPing('messageDelete', ...args);
	console.log(res ? res.mentions : false);
});

client.on('messageUpdate', (...args) => {
	const res = GhostPing('messageUpdate', ...args);
	console.log(res ? res.mentions : false);
});

client.login(process.env['MyToken']);
```
