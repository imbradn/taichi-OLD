const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['user', 'uinfo', 'ui', 'whois']
        });
    }

    async run(message, [target]) {
        const member = message.mentions.members.last() || message.guild.members.cache.get(target) || message.member;
        const roles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);
        const userFlags = member.user.flags.toArray(); 

        const embed = new MessageEmbed()
            .setDescription(`**__${member.user.username}__ info**`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512}))
            .setColor('RED')
            .addField(`User`, [
                `**Username:** ${member.user.username}`,
                `**Disciminator:** ${member.user.discriminator}`,
                `**ID:** ${member.id}`,
                `**Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : "None"}`,
                `**Avatar:** [Click Here](${member.user.displayAvatarURL({ dynamic: true })})`,
                `**Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
                `**Status:** ${member.user.presence.status}`,
                `**Game:** ${member.user.presence.game || 'Not playing a game.'}`,
            ])
            .addField(`Guild`, [
                `**Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
                `**Server Join Time:** ${moment(member.joinedAt).format('LL LTS')}`,
                `**Boosts __${message.guild.name}__:** ${member.premiumSinceTimestamp !== null ? true : false}`,
                `**Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
                `**Roles [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`,
            ])
            


            message.channel.send(embed)

    }
}