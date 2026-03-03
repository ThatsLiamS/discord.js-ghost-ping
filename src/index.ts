import type { Message } from 'discord.js';
import type { ReturnObject } from './typings/index';

import events from './events';

function detector(message: Message): (ReturnObject | false);
function detector(oldMessage: Message, newMessage: Message): (ReturnObject | false);

/**
 * @function detector
 * @description Main entry point for the detector. Routes to either messageUpdate or messageDelete logic based on arguments.
 *
 * @param {Message} messageOrOld - The deleted message, or the old message if an edit occurred.
 * @param {Message} [newMessage] - The updated message (optional; only provided on message edits).
 *
 * @returns {ReturnObject | false} Returns the ghost ping data object if detected, otherwise false.
 * @throws {Error} Throws if the initial 'messageOrOld' parameter is omitted.
 *
 * @author Liam Skinner <me@liamskinner.co.uk>
**/
function detector(messageOrOld: Message, newMessage?: Message): (ReturnObject | false) {

	if (!messageOrOld) {
		throw new Error('Missing Required Parameter: A DiscordJS Message object.');
	}

	if (newMessage) {
		return events.messageUpdate(messageOrOld, newMessage);
	}
	return events.messageDelete(messageOrOld);
};

export default detector;
