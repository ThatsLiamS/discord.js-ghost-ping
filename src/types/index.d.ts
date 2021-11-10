declare module "discord.js-ghost-ping" {
    export function detector(event: 'messageDelete' | 'messageUpdate', message: object, newMessage?: object): Promise<void>;
}