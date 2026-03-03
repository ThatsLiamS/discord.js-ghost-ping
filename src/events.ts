import type { Message, GuildMember, Role } from 'discord.js';
import type { GuildMessage, ReturnObject } from './typings/index';

const validMembers = (member: GuildMember, message: GuildMessage): string => {
	if (!member?.user?.bot && member?.id !== message?.author?.id) {
		return member.toString();
	}
	return '';
};

const validRoles = (role: Role): string => {
	if (role?.toString()?.startsWith('<')) {
		return role.toString();
	}
	return '';
};


/**
 * Formats the data into an object to return
 *
 * @param {GuildMessage} message - Original Discord Message object
 * @param {string[]} mentions - Array of formatted Discord Mentions
 *
 * @returns {ReturnObject}
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
 * Handles the messageUpdate event
 *
 * @param {Message} oldMessage - Original discord message object
 * @param {Message} newMessage - Updated discord message object
 *
 * @returns {ReturnObject | false}
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
 * Handles the messageDelete event
 *
 * @param {Message} message - Discord message object
 *
 * @returns {ReturnObject | false}
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
