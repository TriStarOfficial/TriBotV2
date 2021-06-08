const { default: axios } = require("axios");
const { Message, MessageEmbed, Client } = require("discord.js");
const glob = require('glob')

module.exports = {
    name: 'reload',
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */

    run: async (client, message, args, prefix, command) => {
        client.commands.sweep(() => true)
        glob(`${__dirname}/../**/*.js`, async (err, FilePath) => {
            if (err) return message.channel.send(err, { code: 'ini' })
            FilePath.forEach((file) => {
                delete require.cache[require.resolve(file)];

                const pull = require(file);

                if (pull.name) {
                    client.commands.set(pull.name, pull);
                };

                if (pull.aliases && Array.isArray(pull.aliases)) {
                    pull.aliases.forEach((alias) => {
                        client.aliases.set(alias, pull.name)
                    })
                }

                
            })
            const embed = new MessageEmbed()
            .setColor('BLURPLE')
            .setTitle('Reloaded All The Command!')
            message.channel.send(embed)
        })
    }
}