const Discord = require('discord.js')

const fs = require('fs');
files = new Discord.Collection();
const featureFiles = fs.readdirSync(`${__dirname}/features/`).filter(file => file.endsWith('.js'));
for(const file of featureFiles){
    const fileInfo = require(`${__dirname}/features/${file}`);
    files.set(fileInfo.name, fileInfo);
}

class ParameterError extends Error {
    constructor(...params) {
        super(...params)
        this.name = "ParameterError"  
    }
}

class MissingPermissions extends Error {
    constructor(...params) {
        super(...params)
        this.name = "MissingPermissions"  
    }
}

class ChannelNotFound extends Error {
    constructor(...params) {
        super(...params)
        this.name = "ChannelNotFound"  
    }
}

const ErrorMessages = {
    unableToSendMessage: new MissingPermissions(`Unable to send message to channel provided`),
    
    expectedParameterError: new ParameterError(`Expected parameter (EventType) in dectector()\n\nclient.on(\"messageDelete\", message => {\n                       ^\n                       |\n(EventType) is \'messageDelete\'\n`),
    unpectedParameterError: new ParameterError(`Unexpected parameter (EventType) in dectector()\n\nclient.on(\"messageDelete\", message => {\n                       ^\n                       |\n(EventType) is \'messageDelete\'\n`),
    MessageOne: new ParameterError(`Expected parameter (message) in dectector()\n\nclient.on(\"messageDelete\", message => {\n                           ^\n                           |\n(message) is \'message\'`),
    MessageBoth: new ParameterError(`Expected parameters (oldMessage, newMessage) in dectector()\n\nclient.on(\"messageUpdate\", oldMessage, newMessage => {\n                                        ^\n                                        |\n(oldMessage, newMessage) is \'oldMessage, newMessage\'`),
    
    unableToGetChannel: new ChannelNotFound(`Channel Not Found, Invalid channel ID provided.`),
}

module.exports = {
    detector: (eventType, two, three, four) => {
        if (eventType === undefined) throw ErrorMessages.expectedParameterError

        if(eventType == "messageDelete") return files.get('ghostping-messageDelete').execute(ErrorMessages, two, three)
        if(eventType == "messageUpdate") return files.get('ghostping-messageUpdate').execute(ErrorMessages, two, three, four)
        
        else throw ErrorMessages.unpectedParameterError
    }
}
