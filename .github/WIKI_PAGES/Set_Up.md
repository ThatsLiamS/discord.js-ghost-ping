# Set up
Now, we have the package installed on our machine - we have to set it up; otherwise, it won't do anything.

### Define the Package
```js
const GhostPing = require('discord.js-ghost-ping')
/* or */
import GhostPing from 'discord.js-ghost-ping'
```
You can 'name' the package anything; however, in this guide, we will be using `GhostPing`.

### Set Up The Detectors
The package requires two detectors in separate Discord.js events to work correctly because ghost pings can occur in deleted and updated/edited messages. The [`messageDelete`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageDelete) and [`messageUpdate`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageUpdate). 

The events should look like this:
```js
client.on('messageDelete', message => { 
    ...
})
client.on('messageUpdate', (oldMessage, newMessage) => {
    ...
})
```

The variable `GhostPing` is an non-async function.
#### **Required Parameters:**
1. Event Type: [`'messageDelete'`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageDelete) or [`'messageUpdate'`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageUpdate)

2. Message Object(s): This is dependant on the event!

[`'messageDelete'`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageDelete) = [`message`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageDelete)

[`'messageUpdate'`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageUpdate) = [`oldMessage, newMessage`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageUpdate)


#### **Working Example:**
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