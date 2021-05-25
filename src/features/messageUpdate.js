const Discord = require("discord.js");
const { ErrorMessages } = require(`${__dirname}/../utils/errors`)
const { embedValues } = require(`${__dirname}/../utils/embedValues`)
const { checkPerms } = require(`${__dirname}/../utils/checkPerms`)

module.exports = {
    name: "messageUpdate",
    async execute(oldMessage, newMessage, value) {
        if (oldMessage === undefined || newMessage == undefined) throw ErrorMessages.MessageBoth
        if(!oldMessage.mentions || !newMessage.mentions) throw ErrorMessages.MessageBoth
        if(oldMessage.author.bot || oldMessage.mentions.members.size == 0 && oldMessage.mentions.roles.size === 0) return false

        if(value && value.ignorePerms){
            result = checkPerms(oldMessage.member, value.ignorePerms)
            if(result == true) return        
        }

        let stringMentions = "";
        let newArray = []; let oldArray = []

        await newMessage.mentions.members.forEach(member => { 
            if(!member.user.bot && member.id != newMessage.author.id){ 
                newArray.push(`${member}`) 
            } 
        }); 
        await newMessage.mentions.roles.forEach(role => { 
            newArray.push(`${role}`)
        });

        await oldMessage.mentions.members.forEach(member => { 
            if(!member.user.bot && member.id != newMessage.author.id){ 
                oldArray.push(`${member}`) 
            }  
        }); 
        await oldMessage.mentions.roles.forEach(role => { 
            oldArray.push(`${role}`) 
        });

        for(let x = 0; x < oldArray.length; x++){ 
            if (!newArray.includes(oldArray[x])) { 
                stringMentions += `${oldArray[x]} ` 
            } 
        }
        
        if(stringMentions == "") return false

        const embedInfo = embedValues(value, oldmessage)


        const embed = new Discord.MessageEmbed().setTitle(`${embedInfo.title}`).setAuthor(`${oldMessage.member.user.tag}`, `${oldMessage.member.user.displayAvatarURL()}`).setColor(`${embedInfo.color}`).setThumbnail(`${embedInfo.picture}`).addFields( { name: `**Channel:**`, value: `${oldMessage.channel}`, inline: true }, { name: `**Mentions:**`, value: `${stringMentions}`, inline: true }).setFooter(`${embedInfo.footer}`).setTimestamp();
        embedInfo.channel.send({embed}).catch((error) => {
            throw ErrorMessages.unableToSendMessage
        })

        return true
    }
}