const { messageDelete, messageUpdate } = require(`${__dirname}/features/ghostping`)
const { ErrorMessages } = require(`${__dirname}/util/errors`)

function detector(EventType, ...args){

    if(EventType){
        if(EventType == 'messageDelete'){ 
            boolean = messageDelete(...args) 
            return boolean 
        }
        if(EventType == 'messageUpdate'){ 
            boolean = messageUpdate(...args) 
            return boolean
        }

        throw ErrorMessages.unexpectedParameterError

    } else{ 
        throw ErrorMessages.expectedParameterError 
    }
}

module.exports = {
    detector
}
