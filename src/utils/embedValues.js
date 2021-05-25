const { ErrorMessages } = require(`${__dirname}/../utils/errors`)
const Discord = require('discord.js')

function embedValues(object, message){

    let editedValues = {
        title: 'Ghost Ping Detected',
        color: 'C0C0C0',
        picture: 'https://i.imgur.com/k6pLhtU.png',
        footer: 'Don\'t Ghost Ping, smh',
        channel: message.channel
    }
    if(object){

        if(typeof object.title !== 'undefined' && object.title) editedValues.title = object.title
        if(typeof object.color !== 'undefined' && object.color) editedValues.color = object.color
        if(typeof object.picture !== 'undefined' && object.picture) editedValues.picture = object.picture
        if(typeof object.footer !== 'undefined' && object.footer) editedValues.footer = object.footer
        if(typeof object.channel !== 'undefined' && object.channel) editedValues.channel = message.guild.channels.cache.get(object.channel)
    
    }

    if (!editedValues.channel instanceof Discord.TextChannel) throw ErrorMessages.unableToGetChannel

    return editedValues
}

module.exports = {
    embedValues
}