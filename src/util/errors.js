class ParameterError extends Error {
	constructor(...params) {
		super(...params);
		this.name = "ParameterError";
	}
}

class MissingPermissions extends Error {
	constructor(...params) {
		super(...params);
		this.name = "MissingPermissions";
	}
}

class ChannelNotFound extends Error {
	constructor(...params) {
		super(...params);
		this.name = "ChannelNotFound";
	}
}

const ErrorMessages = {
	unableToSendMessage: new MissingPermissions(`Unable to send message to channel provided`),

	expectedParameterError: new ParameterError(`Expected parameter (EventType) in dectector()\n\nclient.on("messageDelete", message => {\n                       ^\n                       |\n(EventType) is 'messageDelete'\n`),
	unpectedParameterError: new ParameterError(`Unexpected parameter (EventType) in dectector()\n\nclient.on("messageDelete", message => {\n                       ^\n                       |\n(EventType) is 'messageDelete'\n`),
	MessageOne: new ParameterError(`Expected parameter (message) in dectector()\n\nclient.on("messageDelete", message => {n                           ^\n                           |\n(message) is 'message'`),
	MessageBoth: new ParameterError(`Expected parameters (oldMessage, newMessage) in dectector()\n\nclient.on("messageUpdate", oldMessage, newMessage => {\n                                        ^\n                                        |\n(oldMessage, newMessage) is 'oldMessage, newMessage'`),

	unableToGetChannel: new ChannelNotFound(`Invalid channel ID provided.`),
};

module.exports = {
	ErrorMessages
};
