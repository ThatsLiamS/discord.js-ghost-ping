const { ErrorMessages } = require(`${__dirname}/../util/errors`)
const Discord = require('discord.js')

function embedValues(object, message){

    let editedValues = {
        title: 'Ghost Ping Detected',
        color: 'C0C0C0',
        picture: 'https://i.imgur.com/k6pLhtU.png',
        footer: 'Don\'t Ghost Ping, smh',
        channel: message.channel
    }
    if(!object || object && (typeof object !== 'object')){ return editedValues }


    if(object.title) editedValues.title = object.title
    if(object.color) editedValues.color = object.color
    if(object.picture) editedValues.picture = object.picture
    if(object.footer) editedValues.footer = object.footer
    if(object.channel) editedValues.channel = message.guild.channels.cache.get(object.channel)

    if (!editedValues.channel instanceof Discord.TextChannel) throw ErrorMessages.unableToGetChannel

    return editedValues
}

module.exports = {
    embedValues
}