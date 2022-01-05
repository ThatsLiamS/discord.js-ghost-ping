const events = require('./events.js');

/**
 * handles and executes event files
 *
 * @param {string} event - The message event that was triggered
 *
 * @returns {Promise<void>|boolean}
**/
const detector = async (event, ...args) => {

	if (!event || !events[event]) throw new Error('Expected parameter \'event\' at position 0');
	return await events[event](...args);

};

module.exports = { detector };
