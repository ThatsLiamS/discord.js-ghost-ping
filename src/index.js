const events = require(`${__dirname}/events`);

/**
 * @param {String} event - The Client event that was triggered
**/

module.exports = {
	detector: async (event, ...args) => {

		if(event && events[event]) {
			return await events[event](...args);
		}

		throw new Error('Expected parameter \'Event\' at position 0');
	}
};