const { MessageEmbed, Message, Client } = require('discord.js');
const moment = require('moment');
const config = require('../../private/config');
const Date = moment().format('YYYY-MM-DD HH:m:s')

module.exports = {
    name: 'ticket-close',
    description: 'This commands closes a ticket.',
    /**
     * @param { Message } message
     * @param { Client } client
     */
    run: async (client, message, args, prefix, command) => {
        if (message.channel.parentID !== '851450132385628210') return (await message.channel.send(new MessageEmbed().setColor('RED').setDescription('Wrong Category!'))).delete({
            timeout: 5 * 1000
        })

        if (message.channel.name.includes('closed')) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('The Channel is already Closed. Stupid!'))

        message.channel.send(new MessageEmbed().setColor('RANDOM').setDescription('This channel will be closed!')).then(m => m.delete({
            timeout: 1000 * 5
        }))

        await message.channel.setName(`${message.channel.name}-closed`)
        client.Transcript.findOne({ Channel: message.channel.id }, async(err, data) => {
            if (err) {
                message.channel.send(
                    new MessageEmbed()
                        .setColor('RED')
                        .setDescription(`Error Detected! Sent to <#${config.config.Logs}>`)
                ).then(m => m.delete({ timeout: 1000*5 }))
                client.channels.cache.get(config.config.Logs).send(
                    new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`\`\`\`js\n${err}\n\`\`\``)
                    .addField('Error Detected At: ', Date, true)
                    .addField('Command Ran By: ', `${message.author} | ${message.author.tag} | ${message.author.id}`,  true)
                    .addField('Command Ran In: ', `${message.channel} | ${message.channel.name} | ${message.channel.id}`, true)
                )
                return;
            };
            if (data) {
                message.channel.updateOverwrite(data.Author, { VIEW_CHANNEL: false })
            }
        })
    }
}