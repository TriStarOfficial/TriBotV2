const { MessageEmbed, Message } = require('discord.js');
const config = require('../../private/config');

module.exports = {
    name: 'ticket',
    description: 'This commands creates a ticket.',
    /**
     * @param { Message } message
     */
    run: async (client, message, args, prefix, command) => {
        message.guild.channels.create(`ticket-${message.author.username}`, {
            type: 'text',
            parent: config.config.TicketParent,
            topic: message.author.id,
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ['SEND_MESSAGES','VIEW_CHANNEL'],

                },
                {
                    id: message.author.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                }
            ]
        }).then(async channel => {
            const MainEmbed = new MessageEmbed()
            .setTitle('TriStar UI Support')
            .setColor('#32a852')
            .setDescription('Please Wait For Support To Arrive!')
            .setTimestamp()
            .setFooter('TriStar UI')
    
            await channel.send(MainEmbed)
        });
    }
}