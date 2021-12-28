const ignore = require(`${__dirname}/ignore`);

/**
 * assigns custom field values for the embed
 *
 * @param {object} object - Optional customisation object
 * @param {object} message - Discord message object
 *
 * @returns {object}
**/
const custom = (object, message) => {

	const editedValues = {};

	editedValues.title = (object && object.title) ? object.title : 'Ghost Ping Detected';
	if(editedValues.title.length > 256) { editedValues.title = 'Ghost Ping Detected'; }

	editedValues.color = (object && object.color) ? object.color : 'C0C0C0';
	if(editedValues.color.length > 50) { editedValues.color = 'C0C0C0'; }

	editedValues.footer = (object && object.footer) ? object.footer : 'Don\'t Ghost Ping, smh';
	if(editedValues.footer.length > 256) { editedValues.footer = 'Don\'t Ghost Ping, smh'; }

	let channel;
	if(object && object.channel) {
		channel = message.guild.channels.cache.get(object.channel);
	}
	editedValues.channel = channel ? channel : message.channel;

	return editedValues;
};

/**
 * responsible for creating and sending the message in Discord
 *
 * @param {object} object - Optional customisation object
 * @param {object} message - Discord message object
 * @param {string} mentions - String of all ghost-pinged mentions
 *
 * @returns {boolean}
**/
const send = async (object, message, mentions) => {

	if(object && object.ignore) {
		if(ignore(object.ignore, message) == true) {
			return false;
		}
	}
	const { title, color, footer, channel } = custom(object, message);

	const embed = {
		color: `${color}`, title: `${title}`, url: 'https://www.npmjs.com/package/discord.js-ghost-ping',
		author: { name: `${message.author.tag}`, icon_url: `${message.author.displayAvatarURL()}`, },
		fields: [
			{ name: '**Channel:**', value: `${message.channel}`, inline: true },
			{ name: '**Mentions:**', value: `${mentions}`, inline: true },
		],
		timestamp: new Date(),
		footer: { text: `${footer}`, },
	};

	await channel.send({ embeds: [embed] }).catch(() => {
		throw new Error('Unable to send message to channel');
	});

	return true;

};

module.exports = send;