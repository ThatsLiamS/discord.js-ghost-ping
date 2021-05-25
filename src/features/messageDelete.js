const Discord = require("discord.js");
const { ErrorMessages } = require(`${__dirname}/../utils/errors`)
const { embedValues } = require(`${__dirname}/../utils/embedValues`)
const { checkPerms } = require(`${__dirname}/../utils/checkPerms`)

module.exports = {
    name: "messageDelete",
    async execute(message, value) {
        if (message === undefined) throw ErrorMessages.MessageOne
        if(!message.mentions) throw ErrorMessages.MessageOne
        if(message.author.bot || message.mentions.members.size == 0 && message.mentions.roles.size === 0) return false

        if(value && value.ignorePerms){
            result = checkPerms(message.member, value.ignorePerms)
            if(result == true) return        
        }

        let stringMentions = "";

        await message.mentions.members.forEach(member => { 
            if(!member.user.bot  && member.id != message.author.id){ 
                stringMentions += `${member} ` 
            } 
        })
        await message.mentions.roles.forEach(role => { 
            stringMentions += `${role} ` 
        })

        if(stringMentions == "") return false


        const embedInfo = embedValues(value, message)

        const embed = new Discord.MessageEmbed().setTitle(`${embedInfo.title}`).setAuthor(`${message.member.user.tag}`, `${message.member.user.displayAvatarURL()}`).setColor(`${embedInfo.color}`).setThumbnail(`${embedInfo.picture}`).addFields( { name: `**Channel:**`, value: `${message.channel}`, inline: true }, { name: `**Mentions:**`, value: `${stringMentions}`, inline: true }).setFooter(`${embedInfo.footer}`).setTimestamp();
        embedInfo.channel.send({embed}).catch((error) => { 
            throw ErrorMessages.unableToSendMessage
        })

        return true
    }
}