module.exports = {
    name: 'Purge',
    description: 'This is a purge command',
    async execute(message, args, Discord){
        // First err
        const erroneEmbed = new Discord.MessageEmbed()
        .setColor('#32a852')
        .setDescription('Please provide a number from 1 to 100')
        // Second err
        const errtwoEmbed = new Discord.MessageEmbed()
        .setColor('#32a852')
        .setDescription('Cannot Purge more than 100 messages')
        // Third err
        const errthreeEmbed = new Discord.MessageEmbed()
        .setColor('#32a852')
        .setDescription('Please provide a number')
        if(!args[0]) return message.reply(erroneEmbed);

        if(isNaN(args[0])) return message.reply(errthreeEmbed);

        if (args[0] > 100) return message.reply(errtwoEmbed)
        if (args[0] < 1) return

        await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages);
        })
    }
}