const events = require('./events.js');

/**
 * Handles and executes event files
 * @param {string} event - The message event that was triggered
 * @param {...any} args - Additional arguments to pass to the event handler
 * @returns {object | false}
**/
const detector = (event, ...args) => {

    if (typeof event !== 'string' || !events[event]) {
        console.error(`Invalid event or missing handler for event '${event}'`);
        return false;
    };

    const result = events[event](...args);

    if (result === undefined) {
        console.error(`Event handler for '${event}' returned undefined.`);
    };

    return result || false;
};

module.exports = detector;
