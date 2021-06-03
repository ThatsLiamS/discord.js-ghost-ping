const { ErrorMessages } = require(`${__dirname}/../util/errors`)

function embedValues(object, message){

    /* Default Values */
    let editedValues = {
        title: 'Ghost Ping Detected',
        color: 'C0C0C0',
        picture: 'https://i.imgur.com/k6pLhtU.png',
        footer: 'Don\'t Ghost Ping, smh',
        channel: message.channel
    }

    /* Does the user provide the argument and is it an object? */
    if(!object || object && (typeof object !== 'object')){ return editedValues }

    /* Changes the values */
    if(object.title && object.title.toString().length < 257 ) editedValues.title = object.title
    if(object.color) editedValues.color = object.color
    if(object.picture) editedValues.picture = object.picture
    if(object.footer && object.footer.toString().length < 2049 ) editedValues.footer = object.footer
    if(object.channel) editedValues.channel = message.guild.channels.cache.get(object.channel)

    /* Return the edited values to use in send() */
    return editedValues
}

module.exports = {
    embedValues
}