module.exports = {
    name: 'Ping',
    description: 'This is a ping command',
    execute(message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#32a852')
        .setDescription(`🏓 Latency is ${Date.now() - message.createdTimestamp}ms.`)
        .setTimestamp()
        .setFooter('TriStar UI Services')
        message.channel.send(newEmbed)
    }
}