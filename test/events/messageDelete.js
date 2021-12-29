const { detector } = require('../../src/index');

module.exports = {
    name: 'messageDelete',
    async execute(message) {

        await detector('messageDelete', message);

    }
};