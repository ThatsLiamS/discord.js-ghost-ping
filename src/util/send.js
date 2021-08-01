const Discord = require('discord.js');

const { ErrorMessages } = require(`${__dirname}/errors`);
const { ignore } = require(`${__dirname}/ignore`);

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

module.exports = {
	send: async (object, message, mentions) => {
		const { title, color, footer, channel } = custom(object, message);

		const embed = new Discord.MessageEmbed()
			.setTitle(title)
			.setAuthor(`${message.member.user.tag}`, `${message.member.user.displayAvatarURL()}`)
			.setColor(color)
			.addFields(
				{ name: `**Channel:**`, value: `${message.channel}`, inline: true },
				{ name: `**Mentions:**`, value: `${mentions}`, inline: true }
			)
			.setFooter(footer)
			.setTimestamp();

		if(ignore(object, message) == true) {
			return false;
		}

		await channel.send({ embeds: [embed] }).catch(() => {
			throw ErrorMessages.unableToSendMessage;
		});

		return true;

	}
};