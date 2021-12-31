module.exports = {
	name: 'ready',
	once: true,

	execute: async (client) => {

		console.log(`Logged in as ${client.user.tag}!`);

		/* Set client status */
		client.user.setPresence({
			status: 'online',
			activities: [{ type: 'PLAYING', name: 'TEST' }],
		});
	}
};