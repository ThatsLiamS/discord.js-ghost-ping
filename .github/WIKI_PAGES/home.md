<div align='center' >
	<a href='https://npmjs.com/package/discord.js-ghost-ping'><img src='https://img.shields.io/npm/v/discord.js-ghost-ping.svg?maxAge=3600' alt='Verison' ></a>
	<a href='https://npmjs.com/package/discord.js-ghost-ping'><img src='https://img.shields.io/npm/dt/discord.js-ghost-ping.svg?maxAge=3600' alt='Downloads' ></a>
	<a href='https://npmjs.com/package/discord.js-ghost-ping'><img src='https://img.shields.io/bundlephobia/minzip/discord.js-ghost-ping.svg?maxAge=3600' alt='npm bundle size'></a>
</div>

# **GhostPing Wiki**


## **Installation**

1. Open the CMD / Shell / Terminal
2. Naviagate to the project's Root Directory
3. Run either command:
```bash
$ npm install discord.js-ghost-ping
$ yarn add discord.js-ghost-ping
```

## **Usage**

1. Import the package
```javascript
const GhostPing = require('discord.js-ghost-ping');
import GhostPing from 'discord.js-ghost-ping';
```

2. The package requires two detectors in separate DiscordJs events to work correctly because ghost pings can occur in deleted **and** updated/edited messages. The [`messageDelete`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageDelete) and [`messageUpdate`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageUpdate). 
```javascript
client.on('messageDelete', message => { 
    ...
})
client.on('messageUpdate', (oldMessage, newMessage) => {
    ...
})
```

3. Add the detector

The Detector Function requires **2 (or 3)** parameters. The first is the DiscordJS Event ([`messageDelete`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageDelete) or [`messageUpdate`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageUpdate)). The second is the Discord Message object (`message` or `oldMessage`, `newMessage`).
```javascript
client.on('messageDelete', message => { 
    const result = GhostPing('messageDelete', message);

	/* Use result to send your own alert */
	message.channel.send({ content: `You have been **ghost pinged** - ${result.mentions}` });
})
```

## **Return Object**

```
{
	author:      <Object>     |  Discord User
	channel:     <Object>     |  Discord TextChannel
	guild:       <Object>     |  Discord Guild

	message:     <Object>     |  Discord Message
	mentions:  Array<String>  |  ['<@0000>', '<@0000>']
}
```
## **Support**

Thanks for checking out the documentation. If you require further assistance, please either

- Open a **[GitHub Issue](https://github.com/ThatsLiamS/discord.js-ghost-ping)**
- Join our **[Support Server](https://discord.gg/2je9aJynqt)**