const { detector } = require('../../src/index');

module.exports = {
	name: 'messageUpdate',
	async execute(oldMessage, newMessage) {

		await detector('messageUpdate', oldMessage, newMessage);

	}
};