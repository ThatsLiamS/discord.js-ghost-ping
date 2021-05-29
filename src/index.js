const { messageDelete, messageUpdate } = require(`${__dirname}/features/ghostping`)
const { ErrorMessages } = require(`${__dirname}/util/errors`)

function detector(EventType, ...args){

    if(EventType){
        if(EventType == 'messageDelete'){ messageDelete(...args) }
        else if(EventType == 'messageUpdate'){ messageUpdate(...args) }

        else{ ErrorMessages.unexpectedParameterError }

    } else{ throw ErrorMessages.expectedParameterError }

}

module.exports = {
    detector
}
