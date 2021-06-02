const { messageDelete, messageUpdate } = require(`${__dirname}/features/ghostping`)
const { ErrorMessages } = require(`${__dirname}/util/errors`)

function detector(EventType, ...args){

    if(EventType){
        if(EventType == 'messageDelete'){ 
            return messageDelete(...args)  
        }
        if(EventType == 'messageUpdate'){ 
            return messageUpdate(...args) 
        }

        throw ErrorMessages.unexpectedParameterError

    } else{ 
        throw ErrorMessages.expectedParameterError 
    }
}

module.exports = {
    detector
}
