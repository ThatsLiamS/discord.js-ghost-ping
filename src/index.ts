import type { messageType, returnType } from './typings/index';
import events from './events';

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
		throw new Error('Missing Required Parameter: \'event\'.');
	}

	switch (event) {
		case 'messageDelete':
			return events.messageDelete(args[0]);
		case 'messageUpdate':
			return events.messageUpdate(args[0], args[1]);
		default:
			return false;
	}
};

export default detector;
