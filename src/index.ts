import type { Message } from 'discord.js';
import type { ReturnObject } from './typings/index';

import events from './events';

function detector(message: Message): (ReturnObject | false);
function detector(oldMessage: Message, newMessage: Message): (ReturnObject | false);

/**
 * Handles and routes message events to their appropriate executors.
 *
 * @param {Message} messageOrOld - The Discord message that was deleted, or the original message prior to an update.
 * @param {Message} [newMessage] - The updated Discord message. Only provided during a messageUpdate event.
 *
 * @returns {ReturnObject | false} Returns the formatted mention data, or false if no relevant mentions were altered.
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
