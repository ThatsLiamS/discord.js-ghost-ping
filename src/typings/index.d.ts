import type { Message, User, TextBasedChannel, Guild } from 'discord.js';

export type GuildMessage = Message<true>;

export type ReturnObject = {
	author: User,
	channel: TextBasedChannel,
	guild: Guild,
	message: GuildMessage,
	mentions: string[],
};

declare function detector(message: Message): (ReturnObject | false);
declare function detector(oldMessage: Message, newMessage: Message): (ReturnObject | false);

export default detector;
