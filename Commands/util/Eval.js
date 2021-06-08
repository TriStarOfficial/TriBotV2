const { MessageEmbed, Client,Message } = require('discord.js');
const { inspect } = require('util')

module.exports = {
    name: 'eval',
    description: 'Just eval shit!',
    category: 'Admin',
    StaffCommand: true,
    BotCommand: false,
    Developer: false,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client,message,args) => {
        if (!message.member.roles.cache.has('851450096738238474' || '851450097417453638' || '851450099011158036' ||'851450100768571434'||'851450103042801720')) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Missing Roles Requirement!'));
        if (message.content.includes('token' || 'mongo')) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Trying to steal Token or Mongo Database Key Detected!').setTimestamp());
        const code = args.slice().join(" ");
        const embed = new MessageEmbed();
        
        if (!code) return message.channel.send(new MessageEmbed().setColor("RED").setDescription(`Dude Provide some arguments.`));

        try {
            let evaled = await eval(code),
                output;
            if (evaled.constructor.name === `Promise`) {
                output = `📤 Output (Promise)`;
            } else {    
                output = `📤 Output`;
            }
            if (evaled.length > 800) {
                evaled = evaled.substring(0, 800) + `...`;
            }
            embed
                .addField(`📥 Input`, `\`\`\`\n${code}\n\`\`\``)
                .addField(output, `\`\`\`js\n${evaled}\n\`\`\``)
                .setColor(client.color)
                .addField(`Status`, `Success`);
            return client.channels.cache.get('851450178711453716').send(embed);
        } catch (e) {
            embed
                .addField(`📥 Input`, `\`\`\`\n${code}\n\`\`\``)
                .addField(`📤 Output`, `\`\`\`js\n${e}\n\`\`\``)
                .addField(`Status`, `Failed`)
                .setColor(client.color);
            return client.channels.cache.get('851450178711453716').send(embed);
        }
    }
}