const Discord = require('discord.js')

const fs = require('fs');
files = new Discord.Collection();
const featureFiles = fs.readdirSync(`${__dirname}/features/`).filter(file => file.endsWith('.js'));
for(const file of featureFiles){
    const fileInfo = require(`${__dirname}/features/${file}`);
    files.set(fileInfo.name, fileInfo);
}

const ErrorMessages = {
    unableToSendMessage: `\ndiscordjs-ghost-ping: Unable to send embed to channel provided\nDiscordAPIError: Missing Permissions`,
    expectedParameterError: `\ndiscordjs-ghost-ping: expected parameter (EventType) in dectector()\n\ndiscord.js#client.on(\"messageDelete\", message => {\n                       ^\n                       |\n(EventType) is \'messageDelete\'\n`,
    unpectedParameterError: `\ndiscordjs-ghost-ping: unexpected parameter (EventType) in dectector()\n\ndiscord.js#client.on(\"messageDelete\", message => {\n                       ^\n                       |\n(EventType) is \'messageDelete\'\n`,
    MessageOne: `\ndiscordjs-ghost-ping: expected parameter (message) in dectector()\n\ndiscord.js#client.on(\"messageDelete\", message => {\n                                        ^\n                                        |\n(message) is \'message\'`,
    MessageBoth: `\ndiscordjs-ghost-ping: expected parameters (oldMessage, newMessage) in ghostPing#dectector()\n\ndiscord.js#client.on(\"messageUpdate\", oldMessage, newMessage => {\n                                        ^\n                                        |\n(oldMessage, newMessage) is \'oldMessage, newMessage\'`,
}

module.exports = {
     detector: (eventType, two, three, four) => {
        if (eventType === undefined) return console.log(ErrorMessages.expectedParameterError)

        if(eventType == "messageDelete") return files.get('ghostping-messageDelete').execute(ErrorMessages, two, three)
        if(eventType == "messageUpdate") return files.get('ghostping-messageUpdate').execute(ErrorMessages, two, three, four)
        else console.log(ErrorMessages.unpectedParameterError)
    }
}
