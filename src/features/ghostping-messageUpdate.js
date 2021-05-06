const Discord = require("discord.js");
module.exports = {
    name: "ghostping-messageUpdate",
    async execute(ErrorMessages, oldMessage, newMessage, value) {
        if (oldMessage === undefined || newMessage == undefined) throw ErrorMessages.MessageBoth

        if(oldMessage.author.bot || oldMessage.mentions.members.size == 0 && oldMessage.mentions.roles.size === 0) return 

        let embedInfo = { title: `Ghost Ping Detected`, color: `C0C0C0`, picture: `https://cdn.glitch.com/c7f57949-b55c-47c7-bd83-e7563dda5a78%2Fghost%20ping.png?v=1616338530868`, footer: `Don't Ghost Ping, smh`, channel: oldMessage.channel }
        let stringMentions = "";
        let newArray = []; let oldArray = []

        await newMessage.mentions.members.forEach(member => { if(!member.user.bot){ newArray.push(`${member}`) } }); 
        await newMessage.mentions.roles.forEach(role => { newArray.push(`${role}`) });

        await oldMessage.mentions.members.forEach(member => { if(!member.user.bot){ oldArray.push(`${member}`) }  }); 
        await oldMessage.mentions.roles.forEach(role => { oldArray.push(`${role}`) });

        for(let x = 0; x < oldArray.length; x++){ if (!newArray.includes(oldArray[x])) { stringMentions += `${oldArray[x]} ` } }
        
        if(value){
            if(value.title) embedInfo.title = value.title;
            if(value.color) embedInfo.color = value.color;
            if(value.picture) embedInfo.picture = value.picture;
            if(value.footer) embedInfo.footer = value.footer;
            if(value.channel) embedInfo.channel = await oldMessage.guild.channels.cache.get(value.channel)

            if (!embedInfo.channel instanceof Discord.TextChannel) throw ErrorMessages.unableToGetChannel
        }
        if(stringMentions == "") return   

        const embed = new Discord.MessageEmbed().setTitle(`${embedInfo.title}`).setAuthor(`${oldMessage.member.user.tag}`, `${oldMessage.member.user.displayAvatarURL()}`).setColor(`${embedInfo.color}`).setThumbnail(`${embedInfo.picture}`).addFields( { name: `**Channel:**`, value: `${oldMessage.channel}`, inline: true }, { name: `**Mentions:**`, value: `${stringMentions}`, inline: true }).setFooter(`${embedInfo.footer}`).setTimestamp();
        embedInfo.channel.send({embed}).catch((error) => {
            throw ErrorMessages.unableToSendMessage
        })

        return true
    }
}
