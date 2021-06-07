const { MessageEmbed, Message } = require('discord.js');
const config = require('../../private/config');

module.exports = {
    name: 'ticket-close',
    description: 'This commands closes a ticket.',
    /**
     * @param { Message } message
     */
    run: async (client, message, args, prefix, command) => {
        console.log(message.channel.parentID)
        if (message.channel.parentID !== '851450132385628210') return (await message.channel.send(new MessageEmbed().setColor('RED').setDescription('Wrong Category!'))).delete({ timeout: 5*1000 })

        if (message.channel.name.includes('closed')) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('The Channel is already Closed. Stupid!'))
        
        message.channel.send(new MessageEmbed().setColor('RANDOM').setDescription('This channel will be closed!')).then(m => m.delete({ timeout: 1000*5 }))

        await message.channel.setName(`${message.channel.name}-closed`)
        client.TicketTranscript.findOne({ Channel: message.channel.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                message.channel.overwritePermissions([
                    {
                        id: message.guild.id,
                        deny: ['VIEW_CHANNEL']
                    },
                    {
                        id: data.User,
                        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
                    },
                    {
                        id: '835456151184736296',
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
                    },
                    {
                        id: '842127079574732820',
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
                    }
                ])
            }
        })
        
    }
}