declare module "discord.js-ghost-ping" {
    function detector(event: 'messageDelete', message: { [key: string]: any }): object | false;
    function detector(event: 'messageUpdate', oldMessage: { [key: string]: any }, newMessage: { [key: string]: any }): object | false;

    export default detector;
};
