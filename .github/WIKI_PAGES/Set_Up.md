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

The variable `GhostPing` has an attribute `detector()`.
#### **Required Parameters:**
1. Event Type: [`'messageDelete'`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageDelete) or [`'messageUpdate'`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageUpdate)

2. Message Object(s): This is dependant on the event!

[`'messageDelete'`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageDelete) = [`message`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageDelete)

[`'messageUpdate'`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageUpdate) = [`oldMessage, newMessage`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageUpdate)


#### **Working Example:**
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

<style type="text/css" rel="stylesheet">
.btn-block { display: flex; justify-content: space-between; }
.btn { display: flex; font-family: Arial; font-size: 17px; color: #fff; letter-spacing: 1px; line-height: 1; background-color: #804; position: relative; align-items: center; padding: 22px 36px; text-decoration: none; overflow: hidden; } 
.btn:before { position: absolute; top: 0; left: 0; display: block; width: 100%; height: 100%; background-color: rgba(255, 255, 255, .2); }
.btn:after { position: absolute; top: 1px; right: -40px; display: flex; justify-content: center; align-items: center; height: 100%; width: 40px; font-family: "Font Awesome 5 Free"; font-size: 25px; font-weight: 900; line-height: inherit; opacity: 0; }
.right:hover { padding-left: 26px; padding-right: 46px; }
.left:hover { padding-right: 26px; padding-left: 46px; }
</style>

<section class='btn-block' >
    <a href='https://github.com/ThatsLiamS/discord.js-ghost-ping/wiki/Installation' class='btn left'>Installation</a>
    <a href='https://github.com/ThatsLiamS/discord.js-ghost-ping/wiki/Customisation' class='btn right'>Customisation</a>
</section>
