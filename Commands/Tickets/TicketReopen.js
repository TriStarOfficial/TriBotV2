const { MessageEmbed, Message, Client } = require('discord.js');
const moment = require('moment');
const config = require('../../private/config');
const Date = moment().format('YYYY-MM-DD HH:m:s')

module.exports = {
    name: 'ticket-reopen',
    description: 'This commands reopens a ticket.',
    /**
     * @param { Message } message
     * @param { Client } client
     */
    run: async (client, message, args, prefix, command) => {
        if (message.channel.parentID !== '851450132385628210') return (await message.channel.send(new MessageEmbed().setColor('RED').setDescription('Wrong Category!'))).delete({
            timeout: 5 * 1000
        })

        if (!message.channel.name.includes('closed')) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('The Channel is already Open. Stupid!'))

        client.Transcript.findOne({ Author: message.channel.topic }, async(err, data) => {
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
                message.guild.channels.cache.get(data.Channel).setName(`ticket-${message.author.username}`)
                // message.channel.updateOverwrite(data.Author, { VIEW_CHANNEL: true }) //letme try something in another workpsace a bit oK
                message.guild.channels.cache.get(data.Channel).updateOverwrite(data.Author, { VIEW_CHANNEL: true }).catch(err => console.log(err))
            } else {
                return message.channel.send(
                    new MessageEmbed()
                    .setColor('RED')
                    .setTitle(`Couldn't find ${message.author.tag} Ticket!`)
                    .setDescription(`We couldn't find your ticket! To open a ticket use \`-ticket\` \n If you think this is a mistake then contact <@722647978577363026>`)
                )
            }
        })
    }
}