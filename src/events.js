const send = require(`${__dirname}/util/send`);

/**
 * Handles the messageUpdate event
 *
 * @param {object} oldMessage - Orginal discord message object
 * @param {object} newMessage - Updated discord message object
 * @param {object} object - optional customisation object
 *
 * @returns {Promise<void>}
**/
const messageUpdate = async (oldMessage, newMessage, object) => {
	
	if (!oldMessage?.mentions || !newMessage?.mentions) throw new Error('Expected parameters \'oldMessage\', \'newMessage\' at position 1, 2');

	if (oldMessage.author.bot || oldMessage.mentions.members.size === 0 && oldMessage.mentions.roles.size === 0) return false;


	let oldArray = oldMessage.mentions.members.map((member) => {
		if (!member.user.bot && member.id != oldMessage.author.id) return member;
	});

	let newArray = newMessage.mentions.members.map((member) => {
		if (!member.user.bot && member.id != newMessage.author.id) return member;
	});

	oldArray = oldMessage.mentions.roles.concat(oldArray);
	newArray = newMessage.mentions.roles.concat(newArray);

	let mentions = oldArray.filter((member) => !newArray.includes(member));

	if (mentions.length > 1) return await send(object, newMessage, mentions.join(', '));
};


/**
 * Handles the messageDelete event
 *
 * @param {object} message - Discord message object
 * @param {object} object - optional customisation
 *
 * @returns {Promise<void>}
**/
const messageDelete = async (message, object) => {

	if (!message?.mentions) throw new Error('Expected parameter \'message\' at position 0');

	if (message.author.bot || message.mentions.members.size == 0 && message.mentions.roles.size == 0) return false;


	let mentions = message.mentions.members.map((member) => {
		if (!member.user.bot && member.id != message.author.id) return member;
	});
	message.mentions.roles.forEach((role) => mentions.push(role));
	if (mentions.length < 1) return false;
	return await send(object, message, mentions.join(', '));
};


module.exports = {
	messageUpdate,
	messageDelete
};
