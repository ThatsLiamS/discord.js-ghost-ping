import type { Message, GuildMember, Role } from 'discord.js';
import type { GuildMessage, ReturnObject } from './typings/index';


/**
 * @function isEligible
 * @description A TypeScript type guard that checks if a message was sent within a guild (server) and ensures the author is not a bot.
 *
 * @param {Message} message - The standard Discord.js message object to evaluate.
 *
 * @returns {boolean} Returns true if the message meets the criteria, safely narrowing its type to a GuildMessage for subsequent operations.
 *
 * @author Liam Skinner <me@liamskinner.co.uk>
**/
const isEligible = (message: Message): message is GuildMessage => {
	return message.inGuild() && !message.author?.bot;
};

/**
 * @function validMembers
 * @description Validates a mentioned member to ensure they are not a bot and not the author of the message.
 *
 * @param {GuildMember} member - The guild member object to validate.
 * @param {GuildMessage} message - The discord message containing the mention.
 *
 * @returns {string} The formatted mention string if valid, otherwise an empty string.
 *
 * @author Liam Skinner <me@liamskinner.co.uk>
**/
const validMembers = (member: GuildMember, message: GuildMessage): string => {
	if (!member?.user?.bot && member?.id !== message?.author?.id) {
		return member.toString();
	}
	return '';
};

/**
 * @function validRoles
 * @description Validates a mentioned role to ensure it matches the standard Discord mention format.
 *
 * @param {Role} role - The role object to validate.
 *
 * @returns {string} The formatted role mention string if valid, otherwise an empty string.
 *
 * @author Liam Skinner <me@liamskinner.co.uk>
**/
const validRoles = (role: Role): string => {
	if (role?.toString()?.startsWith('<')) {
		return role.toString();
	}
	return '';
};

/**
 * @function formatReturn
 * @description Formats the standardised return object containing the ghost ping data.
 *
 * @param {GuildMessage} message - The message object associated with the ghost ping.
 * @param {string[]} mentions - An array of the detected ghost-pinged mentions.
 *
 * @returns {ReturnObject} An object containing the author, channel, guild, message, and extracted mentions.
 *
 * @author Liam Skinner <me@liamskinner.co.uk>
**/
const formatReturn = (message: GuildMessage, mentions: string[]): ReturnObject => {
	return {
		author: message.author,
		channel: message.channel,
		guild: message.guild,
		message,
		mentions,
	};
};

/**
 * @function extractMentions
 * @description Helper function to extract and validate mentions from a message object to adhere to DRY principles.
 *
 * @param {GuildMessage} targetMessage - The message to extract mentions from.
 *
 * @returns {string[]} An array of valid mention strings.
 *
 * @author Liam Skinner <me@liamskinner.co.uk>
 */
const extractMentions = (targetMessage: GuildMessage): string[] => {
	return [
		...targetMessage.mentions.roles.map((role: Role) => validRoles(role)),
		...targetMessage.mentions.members.map((member: GuildMember) => validMembers(member, targetMessage)),
	].filter(Boolean);
};


/**
 * @function messageUpdate
 * @description Detects ghost pings by comparing mentions between an unedited and edited message.
 *
 * @param {Message} oldMessage - The original message before the edit.
 * @param {Message} newMessage - The updated message after the edit.
 *
 * @returns {ReturnObject | false} The formatted return object with removed mentions, or false if no ghost ping occurred.
 * @throws {Error} Throws if either the old or new message object is missing required parameters (mentions).
 *
 * @author Liam Skinner <me@liamskinner.co.uk>
**/
const messageUpdate = (oldMessage: Message, newMessage: Message): (ReturnObject | false) => {

	if (!oldMessage?.mentions || !newMessage?.mentions) {
		throw new Error('Missing Required Parameters @ MessageUpdate: \'oldMessage\' or \'newMessage\'.');
	}
	if (!isEligible(oldMessage) || !isEligible(newMessage)) return false;

	const oldArray = extractMentions(oldMessage);
	const newArray = extractMentions(newMessage);

	const mentions = oldArray.filter((mention: string) => !newArray.includes(mention));
	if (!mentions.length) return false;

	return formatReturn(newMessage, mentions);
};


/**
 * @function messageDelete
 * @description Detects ghost pings when a message containing mentions is deleted.
 *
 * @param {Message} message - The deleted message object.
 *
 * @returns {ReturnObject | false} The formatted return object with mentions, or false if no ghost ping occurred.
 * @throws {Error} Throws if the message object is missing required parameters (mentions).
 *
 * @author Liam Skinner <me@liamskinner.co.uk>
**/
const messageDelete = (message: Message): (ReturnObject | false) => {

	if (!message?.mentions) {
		throw new Error('Missing Required Parameters @ MessageDelete: \'message\'.');
	}
	if (!isEligible(message)) return false;

	const mentions = extractMentions(message);
	if (!mentions.length) return false;

	return formatReturn(message, mentions);
};


export default {
	messageUpdate,
	messageDelete,
};
