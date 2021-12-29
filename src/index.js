const events = require(`${__dirname}/events`);
const missingParam = require(`${__dirname}/util/error`);
/**
 * handles and executes event files
 *
 * @param {string} event - The message event that was triggered
 *
 * @returns {Promise<void>}
**/
const detector = async (event, ...args) => {

	if (!event || !events[event]) throw new missingParam('Expected parameter \'event\' at position 0');
	return await events[event](...args);


};

module.exports = { detector };