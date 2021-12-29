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

class MessageProhibition extends Error {
	constructor(channel) {
		super(` Unable to send message to channel :  ${channel}`);
		this.name = 'messageProhibition';
		this.message = channel;
	}
}

module.exports = { missingParam, MessageProhibition };