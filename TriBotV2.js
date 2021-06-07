const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const {
    Collection
} = require('discord.js');
const config = require('./private/config');
const { connect } = require('mongoose');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag} | ✅`);
    
    connect(config.config.mongo, {
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log('Connect to MongoDB | ✅'))
});

client.commands = new Collection();
client.aliases = new Collection();
client.category = fs.readdirSync("./commands");
['command'].forEach(handler => {
    require(`./handler/${handler}`)(client);
});


client.on('message', async message => {
    const prefix = config.config.prefix

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args, prefix, command)
})

client.login(config.config.token);