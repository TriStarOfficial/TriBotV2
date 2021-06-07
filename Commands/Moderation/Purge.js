const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'Purge',
    description: 'This is a purge command',
    run: async (client, message, args, prefix, command) => {
        // First err
        const erroneEmbed = new MessageEmbed()
        .setColor('#32a852')
        .setDescription('Please provide a number from 1 to 100')
        // Second err
        const errtwoEmbed = new MessageEmbed()
        .setColor('#32a852')
        .setDescription('Cannot Purge more than 100 messages')
        // Third err
        const errthreeEmbed = new MessageEmbed()
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