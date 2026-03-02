# Advanced Usage

While the **discord.js-ghost-ping** package handles the complex logic of detecting ghost pings, bot developers often want to do more than just send a public alert message.

Because the package returns a comprehensive data object containing the `author`, `channel`, `guild`, `message`, and `mentions`, you can easily build robust moderation and logging systems.

## Common Advanced Scenarios

* **Moderation Logging:** Send a silent, formatted Embed to a dedicated staff logging channel instead of alerting the user in a public chat, which can sometimes escalate drama.
* **Filtering Bots and Admins:** Prevent the detector from triggering if another bot deletes a message, or if a Server Administrator removes a message for moderation purposes.

## Example: Building a Moderation Logger

Here is a working example demonstrating how to integrate the ghost ping detector with Discord.js `EmbedBuilder` and basic filtering.

```javascript
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const GhostPing = require('discord.js-ghost-ping'); //

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] 
});

// The ID of the channel where moderators review logs
const LOG_CHANNEL_ID = '123456789012345678'; 

client.on('messageDelete', async (message) => {
    // 1. Ignore bot messages so they don't trigger the system
    if (message.author?.bot) return;

    // 2. Run the package's detector
    const result = GhostPing('messageDelete', message);

    if (result) {
        // 3. Build a embed using the data the package returns
        const logEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('👻 Ghost Ping Detected')
            .setThumbnail(result.author.displayAvatarURL())
            .addFields(
                { name: 'Sender', value: `<@${result.author.id}>`, inline: true },
                { name: 'Channel', value: `<#${result.channel.id}>`, inline: true },
                { name: 'Mentions', value: result.mentions.join(', ') },
                { name: 'Original Message', value: result.message.content || 'No text content' }
            )
            .setTimestamp();

        // 4. Send the embed to the staff logging channel
        const logChannel = client.channels.cache.get(LOG_CHANNEL_ID);
        if (logChannel) {
            await logChannel.send({ embeds: [logEmbed] });
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
```
