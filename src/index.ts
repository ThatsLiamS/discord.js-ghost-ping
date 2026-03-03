import type { Message } from 'discord.js';
import type { ReturnObject } from './typings/index';

import events from './events';

type DetectorArgs =
	| ['messageDelete', Message]
	| ['messageUpdate', Message, Message];

/**
 * Handles and executes event files.
 *
 * @param {DetectorArgs} args - The event name followed by its required message arguments.
 *
 * @returns {ReturnObject | false}
**/
const detector = (...args: DetectorArgs): (ReturnObject | false) => {

	if ((!args[0]) || (['messageDelete', 'messageUpdate'].includes(args[0]) == false)) {
		throw new Error('Missing Required Parameter: \'event\'.');
	}

	switch (args[0]) {
		case 'messageDelete':
			return events.messageDelete(args[1]);
		case 'messageUpdate':
			return events.messageUpdate(args[1], args[2]);
		default:
			return false;
	}
};

export default detector;
