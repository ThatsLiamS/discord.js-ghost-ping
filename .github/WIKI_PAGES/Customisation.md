# Customisation
We have both detectors fully set up and functional. However, we know everyone's bot is unique and have different themes - because of this, we allow you to customise the message. 

## How?
Add an optional parameter to the `detector()` function, type of JavaScript object. If you want the changes to allow in both deleted and updated messages, you must include them in both `detector()`.

- [Embed](#Embed)
- [Channel](#Channel)
- [Ignore Permissions](#Ignore-Permissions)
- [Example](#Working-Example)


### Embed 
You can change the title, color, footer, thumbnail of the embed. All of these attributes must be strings and not a falsy value. 
```js
GhostPing.detector("messageDelete", message, {
    title: 'Ghost Ping Detected',
    color: 'C0C0C0',
    picture: 'https://i.imgur.com/k6pLhtU.png',
    footer: 'Don\'t Ghost Ping, smh',
})
```

### Channel
By default, the message will get sent to the [`message.channel`](https://discord.js.org/#/docs/main/stable/class/Message?scrollTo=channel) (the channel where the ghost ping is).  However, you can add the ID of the TextChannel you would prefer it to get sent in!
```js
GhostPing.detector('messageDelete', message, {
    channel: '821152834611445770'
})
```

### Ignore Permissions
Use the array `ingorePerms` to select which permissions you want to ignore. If the author has any of these permissions, the message won't get sent.
```js
GhostPing.detector('messageDelete', message, {
    ignorePerms: ['KICK_MEMBERS', 'MANAGE_MESSAGES']
})
```

### Working Example
These are the default values.
```js
GhostPing.detector("messageDelete", message, {
    title: 'Ghost Ping Detected',
    color: 'C0C0C0',
    picture: 'https://i.imgur.com/k6pLhtU.png',
    footer: 'Don\'t Ghost Ping, smh',
    channel: message.channel.id
    ignorePerms: []
})
```
