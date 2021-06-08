const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const { Collection } = require('discord.js');
const config = require('./private/config');
const { connect, model, Schema } = require('mongoose');
client.Transcript = require('./schema/Ticket.js');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag} | ✅`);
    
    connect(config.config.mongo, {
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log('Connect to MongoDB | ✅'))
});
const Alive = require('./server');

const activitylist = [
    "Cloud Development Die",
    "TriStar Hub Win",
    "Over TriStar Services",
    "Your Mom Strip"
]

setInterval(() => {
    const status = activitylist[Math.floor(Math.random() * activitylist.length)]
    client.user.setActivity(status, { type: 'WATCHING' })
}, 5*1000)

const GetVer3 = require('./Functions/Roblox/RbxVer.js')
client.RobloxVersion = model('roblox',
    new Schema({
        ID: Number,
        CurrentVersion: String,
        OldVersion: String
    })
)
GetVer3(client)

client.commands = new Collection();
client.aliases = new Collection();
client.category = fs.readdirSync("./Commands");
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

client.on('message', async message => {
    if (message.channel.parentID !== config.config.TicketParent) return;
    client.Transcript.findOne({ Channel: message.channel.id }, async(err, data) => {
        if (err) throw err;
        if (data) {
            data.Content.push(`${message.author.tag}: ${message.content}`)
        } else {
            data = new client.Transcript({ Channel: message.channel.id, Content:`${message.author.tag}`, Author: message.channel.topic})
        }
        await data.save().catch(err => console.log(err))
    })
})

Alive();
client.login(config.config.token);