const Discord = require('discord.js')
const { embedValues } = require(`${__dirname}/embedValues`)

async function send(value, message, mentions){
    const embedInfo = embedValues(value, message)

    const embed = new Discord.MessageEmbed()
    .setTitle(`${embedInfo.title}`)
    .setAuthor(`${message.member.user.tag}`, `${message.member.user.displayAvatarURL()}`)
    .setColor(`${embedInfo.color}`)
    .setThumbnail(`${embedInfo.picture}`)
    .addFields( 
        { name: `**Channel:**`, value: `${message.channel}`, inline: true }, 
        { name: `**Mentions:**`, value: `${mentions}`, inline: true }
    )
    .setFooter(`${embedInfo.footer}`)
    .setTimestamp();

    embedInfo.channel.send({embed}).catch((error) => { 
        throw ErrorMessages.unableToSendMessage
    })

    return true
}

module.exports = {
    send
}