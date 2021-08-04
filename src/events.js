const send = require(`${__dirname}/util/send`);

/**
 * @param {object} oldMessage - Orginal discord message object
 * @param {object} newMessage - Updated discord message object
 * @param {object} object - optional customisation object
**/
const messageUpdate = async (oldMessage, newMessage, object) => {
	if (oldMessage === undefined || newMessage == undefined || !oldMessage.mentions || !newMessage.mentions) {
		throw new Error('Expected parameters \'oldMessage\', \'newMessage\' at position 1, 2');
	}
	if(oldMessage.author.bot || oldMessage.mentions.members.size == 0 && oldMessage.mentions.roles.size === 0) {
		return false;
	}

	let newArray = []; let oldArray = [];
	oldMessage.mentions.members.forEach((member) => {
		if(!member.user.bot && member.id != oldMessage.author.id) {
			oldArray.push(`${member}`);
		}
	});
	newMessage.mentions.members.forEach((member) => {
		if(!member.user.bot && member.id != newMessage.author.id) {
			newArray.push(`${member}`);
		}
	});
	oldMessage.mentions.roles.forEach((role) => {
		oldArray.push(`${role}`);
	});
	newMessage.mentions.roles.forEach((role) => {
		newArray.push(`${role}`);
	});

	let mentions = [];
	for(const mention of oldArray) {
		if(!newArray.includes(mention)) {
			mentions.push(mention);
		}
	}
	if(!mentions.join('')) { return false; }

	return await send(object, newMessage, mentions.join(', '));
};

/**
 * @param {object} message - Discord message object
 * @param {object} object - optional customisation
**/
const messageDelete = async (message, object) => {

	if(message === undefined || !message.mentions) {
		throw new Error('Expected parameter \'message\' at position 1');
	}
	if(message.author.bot || message.mentions.members.size == 0 && message.mentions.roles.size === 0) {
		return false;
	}

	let mentions = [];

	message.mentions.members.forEach((member) => {
		if(!member.user.bot && member.id != message.author.id) {
			mentions.push(member);
		}
	});
	message.mentions.roles.forEach((role) => {
		mentions.push(role);
	});
	if(!mentions.join('')) { return false; }

	return await send(object, message, mentions.join(', '));
};

module.exports = {
	messageUpdate,
	messageDelete
};