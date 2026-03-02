<div align='center'>
	<a href='https://npmjs.com/package/discord.js-ghost-ping'><img src='https://img.shields.io/npm/v/discord.js-ghost-ping.svg?maxAge=3600' alt='Version' ></a>
	<a href='https://npmjs.com/package/discord.js-ghost-ping'><img src='https://img.shields.io/npm/dt/discord.js-ghost-ping.svg?maxAge=3600' alt='Downloads' ></a>
	<a href='https://npmjs.com/package/discord.js-ghost-ping'><img src='https://img.shields.io/bundlephobia/minzip/discord.js-ghost-ping.svg?maxAge=3600' alt='npm bundle size'></a>
</div>

# **GhostPing Wiki**

Welcome to the official documentation for **discord.js-ghost-ping**! This guide will walk you through installing, setting up, and effectively using the package to detect ghost pings in your Discord server.

---

## **Installation**

Before you can use the package, you need to install it in your project's environment.

### **Steps:**
1. Open your CMD, Shell, or Terminal.
2. Use `cd folder-name` and `cd ..` to navigate the directory structure and locate the root directory of your project.
3. Run one of the following commands based on your package manager:

**npm:**
```bash
npm install discord.js-ghost-ping
```

**Yarn:**
```Bash
yarn add discord.js-ghost-ping
```

## Setup & Usage
Once the package is installed, you need to configure it within your bot's code.

1. Import the Package
First, bring the package into your project file. You can name the variable anything, but we will use `GhostPing` for this guide.

```JavaScript
// CommonJS
const GhostPing = require('discord.js-ghost-ping');

// ES Modules
import GhostPing from 'discord.js-ghost-ping';
```

2. Set Up The Detectors
To work correctly, the package requires two detectors placed in separate Discord.js events. This is crucial because ghost pings can occur when a message is deleted and when a message is updated/edited.

You must utilize both the `messageDelete` and `messageUpdate` events.

```JavaScript

client.on('messageDelete', message => { 
    // Detector logic here
});

client.on('messageUpdate', (oldMessage, newMessage) => {
    // Detector logic here
});
```

3. Add the Detector Function
The `GhostPing` variable acts as a non-async function. It requires 2 (or 3) parameters depending on the event type:

- **Parameter 1 (Event Type):** Either `'messageDelete'` or `'messageUpdate'`.
- **Parameter 2+ (Message Object):** * For `'messageDelete'`: Pass the `message` object.
	- For `'messageUpdate'`: Pass both the `oldMessage` and `newMessage` objects.

## Full Working Example
Here is how it all comes together using discord.js v14:

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
client.on('messageDelete', (message) => {
	const res = GhostPing('messageDelete', message);

	if (res) {
		console.log(`Ghost ping detected in deleted message:`, res.mentions);
	}
});

// Detect when a message with a ping is edited/removed
client.on('messageUpdate', (oldMessage, newMessage) => {
	const res = GhostPing('messageUpdate', oldMessage, newMessage);

	if (res) {
		console.log(`Ghost ping detected in edited message:`, res.mentions);
	}
});

client.login(process.env['MyToken']);
```

## Return Object
If a ghost ping is detected, the function returns a comprehensive object containing the following Discord data:

```JavaScript

{
	author:      <Object>,    //  Discord User
	channel:     <Object>,    //  Discord TextChannel
	guild:       <Object>,    //  Discord Guild
	message:     <Object>,    //  Discord Message
	mentions:    <String[]>   //  Array of mentions, e.g., ['<@0000>', '<@0000>']
}
```

## Support
Thanks for checking out the documentation. If you require further assistance, please either:

- Open a GitHub Issue
- Contact the developer directly at `me @ liamskinner.co.uk`
