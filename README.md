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

=Introducing the Ghost Ping Detector, a powerful tool designed specifically for Discord bot developers. Created by a [4-time verified bot developer](https://liamskinner.co.uk) who has reached millions of users across Discord, this package is your definitive solution for detecting and alerting users to ghost pings.

### Features

- **Real-Time Detection:** Instantly detect when a user has been ghost pinged in a channel. The Ghost Ping Detector immediately alerts your bot whenever a recent message with a mention is deleted.
- **User Notifications:** Provide timely and helpful messages to users, informing them that they were ghost pinged.
- **Easy Integration:** Seamlessly install and integrate the Ghost Ping Detector into your existing Discord bot. Compatible with all major DiscordJS versions.
- **Developer-Friendly:** Suitable for both seasoned bot developers and those just starting out.

### Why Choose Ghost Ping Detector?

- **Reliable and Efficient:** Ensure your bot is more responsive and user-friendly with real-time ghost ping detection.
- **Enhanced User Experience:** Improve your server's environment by keeping users informed and reducing frustration caused by ghost pings.


# ❯ **Help**  

For more information on how to use the package, please refer to the complete documentation on the [repository wiki](https://github.com/ThatsLiamS/discord.js-ghost-ping/wiki) pages. If you have any questions or run into any issues, we also have a [Discord server](https://liamskinner.co.uk/discord) where you can ask the community and the developer for help.

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
