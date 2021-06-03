<div align='center' >
    <a href='https://npmjs.com/package/discord.js-ghost-ping' ><img src='https://david-dm.org/thatsliams/discord.js-ghost-ping.svg?maxAge=3600' alt='Dependencies' ></a>
    <a href='https://npmjs.com/package/discord.js-ghost-ping' ><img src='https://img.shields.io/npm/dt/discord.js-ghost-ping.svg?maxAge=3600' alt='Downloads' ></a>
    <a href='https://npmjs.com/package/discord.js-ghost-ping' ><img src='https://img.shields.io/npm/v/discord.js-ghost-ping.svg?maxAge=3600' alt='Verison' ></a>
</div>

# **Wiki**

### **About**

**discord.js-ghost-ping** is a [Node.js](https://nodejs.org/en/) module that allows you to detect ghost pings inside of [discord.js](https://www.npmjs.com/package/discord.js)!

The package is guaranteed to detect all direct and role ghost pings while allowing you to customize the message sent. Letting you change the title, colour, footer and thumbnail, the channel you want it sent in.

This package comes from the developer of verified bots: [**@Coin Flipper#1767**](https://discord.com/oauth2/authorize?client_id=668850031012610050&scope=bot&permissions=388160) and [**@autoMod#8328**](https://discord.com/oauth2/authorize?client_id=782985846474932315&scope=bot&permissions=77038)

### Example Usage

```js
const Discord = require('discord.js')
const client = new Discord.Client()

const GhostPing = require('discord.js-ghost-ping')

client.on('messageDelete', message => {
    GhostPing.detector('messageDelete', message)
})

client.on('messageUpdate', (oldMessage, newMessage) => {
    GhostPing.detector('messageUpdate', oldMessage, newMessage)
})

client.login(process.env['MyToken'])
```

### help
If you don't understand something in the documentation, you are experiencing problems, or you just need a gentle nudge in the right direction, please don't hesitate to join our [Discord Server](https://discord.gg/2je9aJynqt).


<style type="text/css" rel="stylesheet">
.btn-block { float: right; display: flex; justify-content: space-between; }
.btn { float: right; display: flex; font-family: Arial; font-size: 17px; color: #fff; letter-spacing: 1px; line-height: 1; background-color: #804; position: relative; align-items: center; padding: 22px 36px; text-decoration: none; overflow: hidden; } 
.btn:before { position: absolute; top: 0; left: 0; display: block; width: 100%; height: 100%; background-color: rgba(255, 255, 255, .2); }
.btn:after { position: absolute; top: 1px; right: -40px; display: flex; justify-content: center; align-items: center; height: 100%; width: 40px; font-family: "Font Awesome 5 Free"; font-size: 25px; font-weight: 900; line-height: inherit; opacity: 0; }
.right:hover { padding-left: 26px; padding-right: 46px; }
</style>

<section class='btn-block' >
    <a href='https://github.com/ThatsLiamS/discord.js-ghost-ping/wiki/Installation' class='btn right'>Installation</a>
</section>