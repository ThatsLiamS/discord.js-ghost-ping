/**
 * For Custom Missing Parameter Error
 *
 * @param {string} message - Error message
 */
class missingParam extends Error {
	constructor(message) {
		super(` Missing Parameter(s) : ${message}`);
		this.name = 'missingParameters';
		this.message = message;
	}
}

/**
 * For Custom Message Prohibition Error
 *
 * @param {string} channel - The channel that the message was tried to send to
 *
 */
class MessageProhibition extends Error {
	constructor(channel) {
		super(` Unable to send message to channel :  ${channel}`);
		this.name = 'messageProhibition';
		this.message = channel;
	}
}

module.exports = { missingParam, MessageProhibition };