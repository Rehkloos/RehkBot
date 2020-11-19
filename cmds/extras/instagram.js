const {
    MessageEmbed
} = require('discord.js');
const fetch = require('node-fetch');
const L = require('@util/logger');

module.exports = {
    name: 'instagram',
    aliases: ['ig', 'insta'],
    description: 'instagram info',



    callback: async (message, args) => {
        const username = args.join(' ');
        const r = await message.channel.send('Gathering account details...');

        // Gather data from database
        const url = `https://instagram.hanifdwyputra.xyz/?username=${username}`;
        const res = await fetch(url).then(info => info.json()).catch(err => {
            // An error occured when looking for account
            L.log(error);
        });


        // Displays Data
        const latest = res.graphql.user.edge_owner_to_timeline_media.edges[0].node; // json tree for finding latest post
        const post = latest.shortcode;
        const account = res.graphql.user;
        const embed = new MessageEmbed()
            .setColor(0xDC143C)
            .setTitle(account.full_name)
            .setURL(`https://instagram.com/${username}`)
            .setThumbnail(account.profile_pic_url)
            .addField('Username:', account.username)
            .addField('Full Name:', account.full_name)
            .addField('Biography:', (account.biography.length == 0) ? 'None' : account.biography)
            .addField('Posts:', account.edge_owner_to_timeline_media.count, true)
            .addField('Followers:', account.edge_followed_by.count, true)
            .addField('Following:', account.edge_follow.count, true)
            .addField('Private Account:', account.is_private ? 'Yes :x:' : 'No :white_check_mark:', true)
            .addField('Verified account:', account.is_verified ? 'Yes' : 'No', true)
            .addField('Last Post:', `https://www.instagram.com/p/${post}`);
        r.delete();
        message.channel.send(embed);
    }
}