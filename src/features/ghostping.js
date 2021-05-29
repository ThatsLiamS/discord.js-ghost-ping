const { ErrorMessages } = require(`${__dirname}/../util/errors`)
const { checkPerms } = require(`${__dirname}/../util/checkPerms`)
const { send } = require(`${__dirname}/../util/send`)

async function messageDelete(message, value){

    if(message === undefined || !message.mentions ){ throw ErrorMessages.MessageOne }
    if(message.author.bot || message.mentions.members.size == 0 && message.mentions.roles.size === 0){ return false }

    if(value && value.ignorePerms){ if(checkPerms(message.member, value.ignorePerms) == true){ return false } }

    let stringMentions = "";

    
    await message.mentions.members.forEach(member => { 
        if(!member.user.bot  && member.id != message.author.id){ 
            stringMentions += `${member} ` 
        }
    })

    /* Appends string with all roles pinged */
    await message.mentions.roles.forEach(role => { 
        stringMentions += `${role} ` 
    })

    /*  If there are no ghost pings stop */
    if(stringMentions == ""){ return false }

    return send(value, message, stringMentions)
}

async function messageUpdate(oldMessage, newMessage, value){
    if (oldMessage === undefined || newMessage == undefined || !oldMessage.mentions || !newMessage.mentions){ throw ErrorMessages.MessageBoth }
    if(oldMessage.author.bot || oldMessage.mentions.members.size == 0 && oldMessage.mentions.roles.size === 0){ return false }

    if(value && value.ignorePerms){ if(checkPerms(newMessage.member, value.ignorePerms) == true){ return false } }

    let stringMentions = "";
    let newArray = []; let oldArray = []

    /* Appends array with all members pinged in UPDATED message */
    await newMessage.mentions.members.forEach(member => { 
        if(!member.user.bot && member.id != newMessage.author.id){ 
            newArray.push(`${member}`) 
        } 
    }); 
    /* Appends array with all roles pinged in UPDATED message */
    await newMessage.mentions.roles.forEach(role => { 
        newArray.push(`${role}`)
    });

    /* Appends array with all members pinged in OLD message */
    await oldMessage.mentions.members.forEach(member => { 
        if(!member.user.bot && member.id != newMessage.author.id){ 
            oldArray.push(`${member}`) 
        }  
    });
    /* Appends array with all roles pinged in OLD message */
    await oldMessage.mentions.roles.forEach(role => { 
        oldArray.push(`${role}`) 
    });

    /* Compares two array and appends string with removed mentions in UPDATED message */
    for(let x = 0; x < oldArray.length; x++){ 
        if (!newArray.includes(oldArray[x])) { 
            stringMentions += `${oldArray[x]} ` 
        } 
    }
    
    /*  If there are no ghost pings stop */
    if(stringMentions == ""){ return false }

    return send(value, newMessage, stringMentions)
}

module.exports = {
    messageDelete,
    messageUpdate
}