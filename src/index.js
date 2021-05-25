const Discord = require('discord.js')
const { ErrorMessages } = require(`${__dirname}/utils/errors`)

const fs = require('fs');
files = new Discord.Collection();
const featureFiles = fs.readdirSync(`${__dirname}/features/`).filter(file => file.endsWith('.js'));
for(const file of featureFiles){
    const fileInfo = require(`${__dirname}/features/${file}`);
    files.set(fileInfo.name, fileInfo);
}

module.exports = {
    detector: (eventType, two, three, four) => {
        if (eventType === undefined) throw ErrorMessages.expectedParameterError

        try{ files.get(eventType).execute(two, three, four) }
        catch{ throw ErrorMessages.unpectedParameterError }
    
    }
}
