# **About**
**discord.js-ghost-ping** is a [Node.js](https://nodejs.org/en/) module that allows you to detect ghost pings inside of [discord.js](https://www.npmjs.com/package/discord.js)!

The package is guaranteed to detect all direct and role ghost pings and allows you to customize the embed sent, letting you change the title, colour, footer and thumbnail and the channel you want it sent in.

This package comes from the developer of verified bots: `@Coin Flipper#1767` and `@autoMod#8328`
### What does the package do?
- [x] Detect Ghost Pings
- [x] Send Messages As the Bot

### Help
If you require help using this package, check out the [GitHub Tutorial](https://github.com/ThatsLiamS/discord.js-ghost-ping/wiki/Tutorial). If you have any questions or need any help, please don't hesitate to ask in our [Support Server](https://discord.gg/2je9aJynqt).

# **Installation**
To install, do this command in your shell or command prompt then you are good to go! 
```npm install discord.js-ghost-ping```

Important: you require [Node.js](https://nodejs.org/en/) downloaded if you are locally hosting the program.
# **Example Usage**
### Basic Set Up
The code shows the basic set up that is required to make the ghost ping detector fully functional. Note: all parameters shown are needed to work.
```js
const Discord = require('discord.js');
const client = new Discord.Client(); 

/* Define the 'discord.js-ghost-ping' package! */
const GhostPing = require('discord.js-ghost-ping')

/* setting up the ghost-ping detectors! */
client.on('messageDelete', message => {
    GhostPing.detector("messageDelete", message)
});
client.on('messageUpdate', (oldMessage, newMessage) => { 
    GhostPing.detector('messageUpdate', oldMessage, newMessage)
});
``` 
### Customising The Detector
You can change the title, color, footer, thumbnail of the embed and the channel you want it sent in. The code below shows the default values.
```js
client.on('messageDelete', message => {
    GhostPing.detector("messageDelete", message, {
      title: `Ghost Ping Detected`,
      color: `C0C0C0`,
      footer: `Don't Ghost Ping, smh`,
      picture: `https://imgur.com/a/floxQHv`,
      channel: message.channel.id
    })
});
```
