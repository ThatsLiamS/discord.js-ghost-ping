import type { Message, GuildMember, Role } from 'discord.js';
import type { GuildMessage, ReturnObject } from './typings/index';

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
	if (!oldMessage.inGuild() || !newMessage.inGuild()) return false;
	if (oldMessage.author?.bot) return false;

	const oldArray: string[] = [
		...oldMessage.mentions.roles.map((role: Role) => validRoles(role)),
		...oldMessage.mentions.members.map((member: GuildMember) => validMembers(member, newMessage)),
	].filter(Boolean);

	const newArray: string[] = [
		...newMessage.mentions.roles.map((role: Role) => validRoles(role)),
		...newMessage.mentions.members.map((member: GuildMember) => validMembers(member, newMessage)),
	].filter(Boolean);

	const mentions: string[] = oldArray.filter((mention: string) => !newArray.includes(mention));

	if (!mentions || mentions.length < 1) return false;
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

	if (!message?.mentions) throw new Error('Missing Required Parameters @ MessageDelete: \'message\'.');
	if (!message.inGuild()) return false;
	if (message.author?.bot) return false;

	const mentions: string[] = [
		...message.mentions.roles.map((role: Role) => validRoles(role)),
		...message.mentions.members.map((member: GuildMember) => validMembers(member, message)),
	].filter(Boolean);

	if (!mentions || mentions.length < 1) return false;
	return formatReturn(message, mentions);
};

export default {
	messageUpdate,
	messageDelete,
};
