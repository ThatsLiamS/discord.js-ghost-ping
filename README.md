<div align="center">
	<h1>DiscordJS Ghost Ping</h1>
	<p>A powerful utility for Discord bot developers to detect and handle ghost pings.</p>

	<a href='https://npmjs.com/package/discord.js-ghost-ping'><img src='https://img.shields.io/npm/v/discord.js-ghost-ping.svg?maxAge=3600' alt='Version' ></a>
	<a href='https://npmjs.com/package/discord.js-ghost-ping'><img src='https://img.shields.io/npm/dt/discord.js-ghost-ping.svg?maxAge=3600' alt='Downloads' ></a>
	<a href='https://npmjs.com/package/discord.js-ghost-ping'><img src='https://img.shields.io/bundlephobia/minzip/discord.js-ghost-ping.svg?maxAge=3600' alt='npm bundle size'></a>
</div>

---

## Table of Contents
- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Return Object](#return-object)
- [Support](#support)

## About
Introducing the Ghost Ping Detector, a powerful tool designed specifically for Discord bot developers. Created by a [verified bot developer](https://liamskinner.co.uk) who has reached millions of users across Discord, this package is your definitive solution for detecting and alerting users to ghost pings.

## Features
* **Real-Time Detection:** Instantly detect when a user has been ghost pinged in a channel. The Ghost Ping Detector immediately alerts your bot whenever a recent message with a mention is deleted or altered.
* **User Notifications:** Provide timely and helpful messages to users, informing them that they were ghost pinged.
* **Easy Integration:** Seamlessly install and integrate the detector into your existing Discord bot. Compatible with major discord.js versions.
* **Reliable and Efficient:** Ensure your bot is responsive and user-friendly with real-time detection, reducing server frustration.

## Installation
You can install the package using your preferred node package manager:

**npm:**
```bash
npm install discord.js-ghost-ping
```

**Yarn:**
```Bash
yarn add discord.js-ghost-ping
```

## Usage
The package requires two detectors in separate Discord.js events to work correctly, because ghost pings can occur in both deleted and updated/edited messages.

Here is a working example demonstrating how to integrate the ghost ping detector into a discord.js v14 client:

```JavaScript
const { Client, GatewayIntentBits } = require('discord.js');
const GhostPing = require('discord.js-ghost-ping');

const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages
	] 
});

// Detect when a message with a ping is deleted
client.on('messageDelete', (...args) => {
	const res = GhostPing('messageDelete', ...args);
	
	if (res) {
		console.log(`Ghost ping detected in deleted message:`, res.mentions);
	}
});

// Detect when a message with a ping is edited/removed
client.on('messageUpdate', (...args) => {
	const res = GhostPing('messageUpdate', ...args);
	
	if (res) {
		console.log(`Ghost ping detected in edited message:`, res.mentions);
	}
});

client.login(process.env.DISCORD_TOKEN);
```

## Return Object
When a ghost ping is successfully detected, the function returns an object containing the relevant Discord data so you can easily build your alerts. If no ghost ping is detected, it handles the logic silently.

```JavaScript

{
	author:      <Object>,       // Discord User Object
	channel:     <Object>,       // Discord TextChannel Object
	guild:       <Object>,       // Discord Guild Object
	message:     <Object>,       // Discord Message Object
	mentions:    <String[]>      // Array of mention strings: ['<@0000>', '<@1111>']
}
```

## Support
For comprehensive information on how to configure and use this package, please refer to the documentation on our GitHub Wiki.

If you require further assistance, have questions, or run into issues, you can:

- Open a GitHub Issue
- Contact the developer directly at `me @ liamskinner.co.uk`
