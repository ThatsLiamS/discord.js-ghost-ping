import type { Message, User, TextBasedChannel, Guild } from 'discord.js';

export type GuildMessage = Message<true>;

/**
 * @typedef {Object} ReturnObject
 * @description The standardized object returned when a ghost ping is detected.
 *
 * @property {User} author - The user who sent the ghost ping.
 * @property {TextBasedChannel} channel - The channel where the ghost ping occurred.
 * @property {Guild} guild - The Discord server (guild) where the ghost ping occurred.
 * @property {GuildMessage} message - The Discord message object associated with the ping.
 * @property {string[]} mentions - An array of the formatted mentions (users/roles) that were ghost-pinged.
 *
 * @author Liam Skinner <me@liamskinner.co.uk>
 */
export type ReturnObject = {
	author: User,
	channel: TextBasedChannel,
	guild: Guild,
	message: GuildMessage,
	mentions: string[],
};

/**
 * @function detector
 * @description Detects ghost pings when a message containing mentions is deleted.
 *
 * @param {Message} message - The deleted message object.
 *
 * @returns {ReturnObject | false} The ghost ping data if detected, otherwise false.
 *
 * @author Liam Skinner <me@liamskinner.co.uk>
 */
declare function detector(message: Message): (ReturnObject | false);

/**
 * @function detector
 * @description Detects ghost pings by comparing mentions between an unedited and edited message.
 *
 * @param {Message} oldMessage - The original message before the edit.
 * @param {Message} newMessage - The updated message after the edit.
 *
 * @returns {ReturnObject | false} The ghost ping data if detected, otherwise false.
 *
 * @author Liam Skinner <me@liamskinner.co.uk>
 */
declare function detector(oldMessage: Message, newMessage: Message): (ReturnObject | false);

export default detector;
