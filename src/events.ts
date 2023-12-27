const validMembers = (member: memberType, message: messageType): (string | false) => {
	if (!member?.user?.bot && member?.id !== message?.author?.id) {
		return member.toString();
	};
	return false;
};

const validRoles = (role: roleType): (string | false) => {
	if (role?.toString()?.startsWith('<')) {
		return role.toString()
	};
	return false;
};


/**
 * Formats the data into an object to return
 *
 * @param {messageType} message - Original Discord Message object
 * @param {string[]} mentions - Array of formatted Discord Mentions
 *
 * @returns {returnType}
**/
const formatReturn = (message: messageType, mentions: string[]): returnType => {
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
 * @param {messageType} oldMessage - Original discord message object
 * @param {messageType} newMessage - Updated discord message object
 *
 * @returns {returnType | boolean}
**/
const messageUpdate = (oldMessage: messageType, newMessage: messageType): (returnType | boolean) => {

	if (!oldMessage?.mentions || !newMessage?.mentions) throw new Error('Expected parameters \'oldMessage\', \'newMessage\' at position 1, 2');
	if (oldMessage.author?.bot) return false;

	const oldArray: string[] = [
		...oldMessage.mentions.roles.map((role: roleType) => validRoles(role)),
		...oldMessage.mentions.members.map((member: memberType) => validMembers(member, newMessage)),
	]
	.filter(Boolean);

	const newArray: string[] = [
		...newMessage.mentions.roles.map((role: roleType) => validRoles(role)),
		...newMessage.mentions.members.map((member: memberType) => validMembers(member, newMessage)),
	]
	.filter(Boolean);

	const mentions: string[] = oldArray.filter((mention: string) => !newArray.includes(mention));

	if (!mentions || mentions.length < 1) return false;
	return formatReturn(newMessage, mentions);
};


/**
 * Handles the messageDelete event
 *
 * @param {messageType} message - Discord message object
 *
 * @returns {returnType | boolean}
**/
const messageDelete = (message: messageType): (returnType | boolean) => {

	if (!message?.mentions) throw new Error('Expected parameter \'message\' at position 1');
	if (message.author?.bot) return false;

	const mentions: string[] = [
		...message.mentions.roles.map((role: roleType) => validRoles(role)),
		...message.mentions.members.map((member: memberType) => validMembers(member, message)),
	]
	.filter(Boolean);

	if (!mentions || mentions.length < 1) return false;
	return formatReturn(message, mentions);
};

module.exports = {
	messageUpdate,
	messageDelete,
};
