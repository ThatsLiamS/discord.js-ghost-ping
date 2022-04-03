const send = require('./util/send.js');

const validate = (member, message) => {
	if (!member.user.bot && member.id != message.author.id) return member.toString();
	return null;
};
const filter = (r) => {
	if (r.toString().startsWith('<')) return r.toString();
	return null;
};

/**
 * Handles the messageUpdate event
 *
 * @param {object} oldMessage - Orginal discord message object
 * @param {object} newMessage - Updated discord message object
 * @param {object} object - optional customisation object
 *
 * @returns {boolean}
**/
const messageUpdate = (oldMessage, newMessage, object) => {

	if (!oldMessage?.mentions || !newMessage?.mentions) throw new Error('Expected parameters \'oldMessage\', \'newMessage\' at position 1, 2');
	if (oldMessage.author.bot || oldMessage.mentions.members.size === 0 && oldMessage.mentions.roles.size === 0) return false;

	let oldArray = oldMessage.mentions.members.map(member => validate(member, newMessage));
	oldArray = [...oldMessage.mentions.roles.map(x => filter(x)), ...oldArray];

	let newArray = newMessage.mentions.members.map(member => validate(member, newMessage));
	newArray = [...newMessage.mentions.roles.map(x => filter(x)), ...newArray];

	const mentions = oldArray.filter((mention) => !newArray.includes(mention) && mention.toString().startsWith('<'));

	if (!mentions || mentions.length < 1) return false;
	return send(object, newMessage, mentions);
};


/**
 * Handles the messageDelete event
 *
 * @param {object} message - Discord message object
 * @param {object} object - optional customisation
 *
 * @returns {boolean}
**/
const messageDelete = (message, object) => {

	if (!message?.mentions) throw new Error('Expected parameter \'message\' at position 0');
	if (message.author.bot || message.mentions.members.size == 0 && message.mentions.roles.size == 0) return false;

	let mentions = message.mentions.members.map(member => validate(member, message));
	mentions = [...message.mentions.roles.map(x => filter(x)), ...mentions];

	if (mentions.length < 1) return false;
	return send(object, message, mentions);
};


module.exports = {
	messageUpdate,
	messageDelete
};
