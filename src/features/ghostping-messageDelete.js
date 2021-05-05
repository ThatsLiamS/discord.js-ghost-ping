const Discord = require("discord.js");
module.exports = {
    name: "ghostping-messageDelete",
    description: ``,
    async execute(ErrorMessages, message, value) {
        if (message === undefined) return console.log(ErrorMessages.MessageOne);
        if(message.author.bot || message.mentions.members.size == 0 && message.mentions.roles.size === 0) return 

        let embedInfo = { title: `Ghost Ping Detected`, color: `C0C0C0`, picture: `https://cdn.glitch.com/c7f57949-b55c-47c7-bd83-e7563dda5a78%2Fghost%20ping.png?v=1616338530868`, footer: `Don't Ghost Ping, smh`, channel: message.channel }
        let stringMentions = "";

        await message.mentions.members.forEach(member => { if(!member.user.bot){ stringMentions += `${member} ` } })
        await message.mentions.roles.forEach(role => { stringMentions += `${role} ` })
        
        if(value){
            if(value.title) embedInfo.title = value.title;
            if(value.color) embedInfo.color = value.color;
            if(value.picture) embedInfo.picture = value.picture;
            if(value.footer) embedInfo.footer = value.footer;
            if(value.channel) embedInfo.channel = await message.guild.channels.cache.get(value.channel)

            if (!embedInfo.channel instanceof Discord.TextChannel) return console.log(`\ndiscordjs-ghost-ping: channel not found from ID provided\n\n'channel: ${value.channel}'`);
        } 
        if(stringMentions == "") return

        const embed = new Discord.MessageEmbed().setTitle(`${embedInfo.title}`).setAuthor(`${message.member.user.tag}`, `${message.member.user.displayAvatarURL()}`).setColor(`${embedInfo.color}`).setThumbnail(`${embedInfo.picture}`).setDescription(`**Author:** ${message.author}\n**Channel:** ${message.channel}\n\n**Mentions:**\n${stringMentions}`).setFooter(`${embedInfo.footer}`).setTimestamp();
        embedInfo.channel.send({embed})

        return true
    }
}
