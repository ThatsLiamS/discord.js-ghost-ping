## Table Of Content
1. [Installation](https://github.com/ThatsLiamS/discord.js-ghost-ping/blob/main/docs/tutorial.md#1-installation)
2. [Basic Usage](https://github.com/ThatsLiamS/discord.js-ghost-ping/blob/main/docs/tutorial.md#2-basic-usage)
- [Detectors](https://github.com/ThatsLiamS/discord.js-ghost-ping/blob/main/docs/tutorial.md#set-up-the-detectors)
- [parameters](https://github.com/ThatsLiamS/discord.js-ghost-ping/blob/main/docs/tutorial.md#required-parameters)
3. [Customisation](https://github.com/ThatsLiamS/discord.js-ghost-ping/blob/main/docs/tutorial.md#1-installation)
- [Embed](https://github.com/ThatsLiamS/discord.js-ghost-ping/blob/main/docs/tutorial.md#embed)
- [Channel](https://github.com/ThatsLiamS/discord.js-ghost-ping/blob/main/docs/tutorial.md#channel)
# **1. Installation**
In order to use the package, you first need to install it. 

### Command Prompt

1. Open the command prompt
2. use `cd folder-name` and `cd ..` to nagivate the folder structure
3. Locate the root directory of your program 
4. Run the command ```npm install discord.js-ghost-ping```

### Shell / Terminal

1. Open the shell / Terminal in the root directory
2. Run the command ```npm install discord.js-ghost-ping```

# **2. Basic Usage**
Now that we have the package installed, we need to set it up.

### Define the Package
```js
const GhostPing = require('discord.js-ghost-ping')
```
You can name the package anything however in this tutorial we will be using `GhostPing`.

### Set Up The Detectors
In order to work properly, the package requires 2 detectors in different Discord.js events. The [`messageDelete`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageDelete) and [`messageUpdate`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageUpdate). The events should look like this:
```js
client.on('messageDelete', message => { 
    GhostPing.detector()
})
client.on('messageUpdate', oldMessage, newMessage => { 
    GhostPing.detector()
})
```
#### **Required Parameters:**
1. Event Type: [`'messageDelete'`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageDelete) or [`'messageUpdate'`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageUpdate)

2. Message Object(s): This is dependant on the event!

[`'messageDelete'`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageDelete) = [`message`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageDelete)

[`'messageUpdate'`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageUpdate) = [`oldMessage, newMessage`](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageUpdate)


#### **Working Example:**
```js
const Discord = require('discord.js');
const client = new Discord.Client(); 

const GhostPing = require('discord.js-ghost-ping')

client.on('messageDelete', message => {
    GhostPing.detector('messageDelete', message)
});
client.on('messageUpdate', (oldMessage, newMessage) => { 
    GhostPing.detector('messageUpdate', oldMessage, newMessage)
});

client.login('token')
```

# **3. Customisation**

### Embed 
You can change the title, color, footer, thumbnail of the embed and the channel you want it sent in. The code below shows the default values.
```js
GhostPing.detector("messageDelete", message, {
    title: `Ghost Ping Detected`,
    color: `C0C0C0`,
    footer: `Don't Ghost Ping, smh`,
    picture: `https://imgur.com/a/floxQHv`
})
```

### Channel
By deafult the message will be sent to the [`message.channel`](https://discord.js.org/#/docs/main/stable/class/Message?scrollTo=channel), (The channel where the ghost ping is) however you can add the ID of the channel you would prefer it to be sent to!
```js
GhostPing.detector('messageDelete', message, {
    channel: `Channel ID`
})
```
### Fully Customised 
```js
GhostPing.detector("messageDelete", message, {
    title: `Ghost Ping Detected`,
    color: `C0C0C0`,
    footer: `Don't Ghost Ping, smh`,
    picture: `https://imgur.com/a/floxQHv`,
    channel: message.channel.id
})
```
