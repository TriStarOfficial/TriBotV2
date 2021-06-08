const axios = require('axios');
const { MessageEmbed } = require('discord.js');
module.exports = async (client) => {
    async function GetAppVersion() {
        let res = await axios.get("http://setup.roblox.com/version")
        let ver = res.data;
        return ver;
    }
    const AppVersion = await GetAppVersion()
    setInterval(() => {
        client.RobloxVersion.findOne({ ID: 1 }, async (err,data) => {
            if (err) throw err;
            if (data) {
                if (data.CurrentVersion !== AppVersion) {
                    await client.RobloxVersion.findOneAndUpdate({ ID: 1 }, {OldVersion: data.CurrentVersion}, { new: true }, function(err) {
                        if (err) console.log(err)
                    })
                    await client.RobloxVersion.findOneAndUpdate({ ID: 1 }, {CurrentVersion: AppVersion}, { new: true }, function(err) {
                        if (err) console.log(err);
                    });
    
                    client.channels.cache.get('851450146163261460').send(new MessageEmbed().setColor('GREEN').setTitle('Roblox Updated!').setDescription('Roblox has updated! Please wait for your executor updated to the latest Version!').addField('Old Version', '``` [x] ' + data.OldVersion + '```' ).addField('Current Version', '``` [x] ' + AppVersion + '```'))
                }
    
                data.save()
            } else {
                data = new client.RobloxVersion({
                    ID: 1,
                    CurrentVersion: AppVersion,
                    OldVersion: AppVersion,
                })
    
                await data.save()
            }
        })
    }, 5000);
}