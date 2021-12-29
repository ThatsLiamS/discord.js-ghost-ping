const events = require(`${__dirname}/events`);
/**
 * handles and executes event files
 *
 * @param {string} event - The message event that was triggered
 *
 * @returns {Promise<void>}
**/
const detector = async (event, ...args) => {

	if(event && events[event]) {
		return await events[event](...args);
	}
	throw new Error('Expected parameter \'Event\' at position 0');
};

module.exports = { detector };