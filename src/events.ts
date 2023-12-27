const validate = (member: any, message: any) => (!member?.user?.bot && member?.id !== message?.author?.id) ? member.toString() : null;
const filter = (r: any) => (r?.toString()?.startsWith('<')) ? r.toString() : null;

/**
 * Formats the data into an object to return
 *
 * @param {any} message - Original Discord Message object
 * @param {string[]} mentions - Array of formatted Discord Mentions
 *
 * @returns {any}
**/
const formatReturn = (message: any, mentions: string[]): any => {
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
 * @param {object} oldMessage - Original discord message object
 * @param {object} newMessage - Updated discord message object
 *
 * @returns {object | boolean}
**/
const messageUpdate = (oldMessage: any, newMessage: any): object | boolean => {

	if (!oldMessage?.mentions || !newMessage?.mentions) throw new Error('Expected parameters \'oldMessage\', \'newMessage\' at position 1, 2');
	if (oldMessage.author?.bot) return false;

	const oldArray: any[] = [
		...oldMessage.mentions.roles.map((x: any) => filter(x)),
		...oldMessage.mentions.members.map((member: any) => validate(member, newMessage)),
	];

	const newArray: any[] = [
		...newMessage.mentions.roles.map((x: any) => filter(x)),
		...newMessage.mentions.members.map((member: any) => validate(member, newMessage)),
	];

	const mentions: any[] = oldArray.filter((mention) => !newArray.includes(mention) && mention?.toString()?.startsWith('<'));

	if (!mentions || mentions.length < 1) return false;
	return formatReturn(newMessage, mentions);
};


/**
 * Handles the messageDelete event
 *
 * @param {object} message - Discord message object
 *
 * @returns {object | boolean}
**/
const messageDelete = (message: any): object | boolean => {

	if (!message?.mentions) throw new Error('Expected parameter \'message\' at position 1');
	if (message.author?.bot) return false;

	const mentions = [
		...message.mentions.roles.map((x: any) => filter(x)),
		...message.mentions.members.map((member: any) => validate(member, message)),
	]
	.filter((mention: any) => mention?.toString()?.startsWith('<'));

	if (!mentions || mentions.length < 1) return false;
	return formatReturn(message, mentions);
};

module.exports = {
	messageUpdate,
	messageDelete,
};
