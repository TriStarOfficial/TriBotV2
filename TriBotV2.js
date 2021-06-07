const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '-'

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./Commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./Commands/${file}`);

    client.commands.set(command.name, command)
}

client.once('ready', () => {
    console.log('Ready!')
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    if (message.channel !== client.channels.cache.get('851370262032416798')) {
        message.channel.send(`Bruh! Go to <#851370262032416798>`);
        return;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping!') {
        client.commands.get('Ping').execute(message, args, Discord);
    } else if (command === 'purge') {
        client.commands.get('Purge').execute(message, args, Discord);
    }
});

client.login('ODQ5NjM2NzIzMTc5OTEzMjI2.YLeD3A.ZqA__sJ9_O8VM430H-r9HELXRsk');