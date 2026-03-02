/* Import pre-made Types */
import type { Message, GuildMember, Role, User, TextBasedChannels, Guild } from 'discord.js';

export type messageType = Message;
export type memberType = GuildMember;
export type roleType = Role;

export type returnType = {
	author: User,
	channel: TextBasedChannels,
	guild: Guild,
	message: Message,
	mentions: string[],
};

declare module 'discord.js-ghost-ping' {
	function detector(event: 'messageDelete', message: messageType): returnType | false;
	function detector(event: 'messageUpdate', oldMessage: messageType, newMessage: messageType): returnType | false;

	export default detector;
};
