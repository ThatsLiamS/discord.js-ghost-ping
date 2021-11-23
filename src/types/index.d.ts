declare module "discord.js-ghost-ping" {
    export function detector(event: 'messageDelete', message: object): Promise<void>;
    export function detector(event: 'messageUpdate', message: object, newMessage: object): Promise<void>;
    export function detector(event: 'messageDelete' | 'messageUpdate', message: object, newMessage?: object): Promise<void>
}