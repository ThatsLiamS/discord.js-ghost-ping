declare module "discord.js-ghost-ping" {
	function detector(event: 'messageDelete', message: object): object | boolean;
	function detector(event: 'messageUpdate', oldMessage: object, newMessage: object): object | boolean;

	export default detector;
}