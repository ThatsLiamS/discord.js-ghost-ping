const { ErrorMessages } = require(`${__dirname}/util/errors`);
const { messageDelete, messageUpdate } = require(`${__dirname}/events`);

module.exports = {
	detector: async (eventType, ...args) => {
		if(eventType) {
			if(eventType == 'messageDelete') {
				return await messageDelete(...args);
			}
			else if(eventType == 'messageUpdate') {
				return await messageUpdate(...args);
			}
			else {
				throw ErrorMessages.unexpectedParameterError;
			}
		}
		else {
			throw ErrorMessages.expectedParameterError;
		}
	}
};