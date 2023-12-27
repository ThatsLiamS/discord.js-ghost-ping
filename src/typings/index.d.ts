/* Import pre-made Types */
const { Message, GuildMember, Role, User, TextBasedChannels, Guild } = require('discord.js');


type messageType = Message;
type memberType = GuildMember;
type roleType = Role;

type returnType = {
	author: User,
	channel: TextBasedChannels,
	guild: Guild,

	message: Message,
	mentions: string[],
};


declare module "discord.js-ghost-ping" {
	function detector(event: 'messageDelete', message: messageType): returnType | false;
	function detector(event: 'messageUpdate', oldMessage: messageType, newMessage: messageType): returnType | false;

	export default detector;
};
