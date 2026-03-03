import type { Message, User, TextBasedChannel, Guild } from 'discord.js';

export type GuildMessage = Message<true>;

export type ReturnObject = {
	author: User,
	channel: TextBasedChannel,
	guild: Guild,
	message: GuildMessage,
	mentions: string[],
};

declare function detector(event: 'messageDelete', message: Message): ReturnObject | false;
declare function detector(event: 'messageUpdate', oldMessage: Message, newMessage: Message): ReturnObject | false;

export default detector;
