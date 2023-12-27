const events = require('./events');

/**
 * Handles and executes event files.
 *
 * @param {string} event - The message event that was triggered.
 * @param {...messageType} args - Additional arguments for the event handler.
 *
 * @returns {returnType | boolean}
**/
const detector = (event: string, ...args: messageType[]): (returnType | boolean) => {

	if ((!event) || (['messageDelete', 'messageUpdate'].includes(event) == false)) {
		throw new Error('Expected parameter \'event\' at position 0');
	};

	if (event === 'messageDelete') {
		return events.messageDelete(args[0])
	};
	if (event === 'messageUpdate') {
		return events.messageUpdate(args[0], args[1])
	};

	return false;
};

module.exports = detector;
