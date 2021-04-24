const Discord = require('discord.js')
const client = new Discord.Client();

const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(`${__dirname}/features/`).filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`${__dirname}/features/${file}`);
    client.commands.set(command.name, command);
}

const ErrorMessages = {
    unableToSendMessage: `\ndiscordjs-ghost-ping: Unable to send embed to channel provided\nDiscordAPIError: Missing Permissions`,
    expectedParameterError: `\ndiscordjs-ghost-ping: expected parameter (EventType) in dectector()\n\ndiscord.js#client.on(\"messageDelete\", message => {\n                       ^\n                       |\n(EventType) is \'messageDelete\'\n`,
    unpectedParameterError: `\ndiscordjs-ghost-ping: unexpected parameter (EventType) in dectector()\n\ndiscord.js#client.on(\"messageDelete\", message => {\n                       ^\n                       |\n(EventType) is \'messageDelete\'\n`,
    MessageOne: `\ndiscordjs-ghost-ping: expected parameter (message) in dectector()\n\ndiscord.js#client.on(\"messageDelete\", message => {\n                                        ^\n                                        |\n(message) is \'message\'`,
    MessageBoth: `\ndiscordjs-ghost-ping: expected parameters (oldMessage, newMessage) in ghostPing#dectector()\n\ndiscord.js#client.on(\"messageUpdate\", oldMessage, newMessage => {\n                                        ^\n                                        |\n(oldMessage, newMessage) is \'oldMessage, newMessage\'`,
}

module.exports = {
     detector: (one, two, three, four) => {
        if (one === undefined) return console.log(ErrorMessages.expectedParameterError)

        if(one == "messageDelete") return client.commands.get('ghostping-messageDelete').execute(ErrorMessages, two, three)
        if(one == "messageUpdate") return client.commands.get('ghostping-messageUpdate').execute(ErrorMessages, two, three, four)
        else console.log(ErrorMessages.unpectedParameterError)
    }
}
