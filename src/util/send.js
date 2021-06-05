const Discord = require('discord.js');
const { ErrorMessages } = require(`${__dirname}/../util/errors`);
const { embedValues } = require(`${__dirname}/embedValues`);

async function send(value, message, mentions) {

	const { title, color, picture, footer, channel } = embedValues(value, message);

	const embed = new Discord.MessageEmbed()
		.setTitle(`${title}`)
		.setAuthor(`${message.member.user.tag}`, `${message.member.user.displayAvatarURL()}`)
		.setColor(`${color}`)
		.setThumbnail(`${picture}`)
		.addFields(
			{ name: `**Channel:**`, value: `${message.channel}`, inline: true },
			{ name: `**Mentions:**`, value: `${mentions}`, inline: true }
		)
		.setFooter(`${footer}`)
		.setTimestamp();

	if (channel instanceof Discord.TextChannel == false && channel instanceof Discord.NewsChannel == false) { throw ErrorMessages.unableToGetChannel; }

	await channel.send({ embed }).catch(() => {
		throw ErrorMessages.unableToSendMessage;
	});

	return true;
}

module.exports = {
	send
};