/**
 * Validates a Discord member and message combination
 * @param {object} member - Discord member object
 * @param {object} message - Discord message object
 * @returns {string|null} - Formatted mention string or null
**/
const validateMention = (member, message) =>
	(!member?.user?.bot && member?.id !== message?.author?.id) ? member.toString() : null;

/**
 * Filters and formats a mention string
 * @param {object} mention - Discord mention object (role or member)
 * @returns {string|null} - Formatted mention string or null
**/
const filterMention = (mention) => (
	(mention?.toString()?.startsWith('<')) ? mention.toString() : null
);


/**
 * Formats the data into an object to return
 *
 * @param {object} message - Orginal Discord Message object
 * @param {array<string>} mentions - Array of formatted Discord Mentions
 * @returns {object}
**/
const formatReturn = (message, mentions) => {
	return {
		author: message.author,
		channel: message.channel,
		guild: message.guild,

		message,
		mentions,
	};
};


/**
 * Filters all valid mentions from a discord message object
 * @param {object} message - Discord message object
 * @returns {object[]}
**/
const getMentions = (message) => {
	return [
		...message.mentions.roles.map(filter),
		...message.mentions.members.map(member => validate(member, message)),
	];
};


/**
 * Handles the messageUpdate event
 * @param {object} oldMessage - Orginal discord message object
 * @param {object} newMessage - Updated discord message object
 * @returns {boolean}
**/
const messageUpdate = (oldMessage, newMessage) => {

	if (!oldMessage?.mentions || !newMessage?.mentions) throw new Error('Expected parameters \'oldMessage\', \'newMessage\' at position 1, 2');
	if (oldMessage.author?.bot
		|| (oldMessage.mentions?.members?.size == 0 || !oldMessage.mentions?.members?.size)
		&& (oldMessage.mentions?.roles?.size == 0) || !oldMessage.mentions?.roles?.size) return false;

	const { oldArray, newArray } = {
		oldArray: getMentions(oldMessage),
		newArray: getMentions(newMessage),
	};

	const mentions = oldArray
		.filter(mention => !new Set(newArray).has(mention) && mention?.toString()?.startsWith('<'));

	if (!mentions || mentions.length < 1) return false;
	return formatReturn(newMessage, mentions);
};


/**
 * Handles the messageDelete event
 * @param {object} message - Discord message object
 * @returns {boolean}
**/
const messageDelete = (message) => {

	if (!message?.mentions) throw new Error('Expected parameter \'message\' at position 1');
	if (message.author?.bot
		|| (message.mentions?.members?.size == 0 || !message.mentions?.members?.size)
		&& (message.mentions?.roles?.size == 0) || !message.mentions?.roles?.size) return false;

	const mentions = getMentions(message)
		.filter((mention) => mention?.toString()?.startsWith('<'));

	if (!mentions || mentions.length < 1) return false;
	return formatReturn(message, mentions);
};

/**
 * Export the 2 message events
**/
module.exports = {
	messageUpdate,
	messageDelete,
};
