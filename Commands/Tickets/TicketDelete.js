const { MessageEmbed, Client,Message, MessageAttachment } = require('discord.js')
const fs = require('fs')

module.exports = {
    name: 'ticket-delete',
    description: 'Delete a Ticket!',
    category: 'Tickets',
    BotCommand: false,
    StaffCommand: false,
    Developer: false,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client,message,args) => {
        if (!message.member.roles.cache.has('851450103042801720'|| '851450100768571434' || '851450099011158036')) return message.channel.send(new MessageEmbed().setDescription('Missing Required Role!').setColor('RED'));

        if (message.channel.parentID !== '851450132385628210') return message.channel.send(new MessageEmbed().setColor('RED').setDescription('This Command is only useable with Ticket Category!')).then(m => m.delete({ timeout: 5000 }));
        if (!message.channel.name.includes('closed')) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Please Close the ticket first by doing `-ticket-close`'))
        const TranscriptChannel = message.guild.channels.cache.get('851450173153869886')
        message.channel.send(new MessageEmbed().setColor("RED").setDescription('Ticket Deleteing in 5 Seconds...').setTitle('TriStar Ticket'))
        setTimeout(() => {
            message.channel.delete().then(async ch => {
                client.Transcript.findOne({ Channel: ch.id }, async(err,data) => {
                    if (err) throw err;
                    if (data){
                        fs.writeFileSync(`../${ch.id}.txt`, data.Content.join("\n\n"))
                        TranscriptChannel.send(new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`${message.guild.members.cache.get(data.Author).user.tag} Ticket!`)
                        );
                        TranscriptChannel.send(new MessageAttachment(fs.createReadStream(`../${ch.id}.txt`)))
                        fs.unlinkSync(`../${ch.id}.txt`)
                        await client.Transcript.findOneAndDelete({ Channel: ch.id })
                    }
                })
            })
        }, 5000);        
    }
}           