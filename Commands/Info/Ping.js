const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'This is a ping command',
    run: async (client, message, args, prefix, command) => {
        const PingValue = Date.now() - message.createdTimestamp;
        const Ping = PingValue.toString().replace("-", " ")

        const newEmbed = new MessageEmbed()
        .setColor('#32a852')
        .setDescription(`🏓 Latency is ${Ping}ms.`)
        .setTimestamp()
        .setFooter('TriStar UI Services')
        message.channel.send(newEmbed)
    }
}