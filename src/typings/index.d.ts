declare module "discord.js-ghost-ping" {
	export function detector(event: 'messageDelete', message: object, customisation?: object): Promise<void | boolean>;
	export function detector(event: 'messageUpdate', message: object, newMessage: object, customisation?: object): Promise<void | boolean>;
}