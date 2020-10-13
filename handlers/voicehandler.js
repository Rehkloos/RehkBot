class VoiceController {
    constructor(Discord, guild, member) {
        this.Discord = Discord;
        this.guild = guild;
        this.member = member;
    }

    action(c) {
        let v = new this.Discord.VoiceState(this.guild, {
            user_id: this.member.id
        });
        v.setMute(c).then(() => {}).catch(() => {});
        v.setSelfMute(c).then(() => {}).catch(() => {});
    }

    muteAll() {
        this.action(true);
    }

    unmuteAll() {
        this.action(false);
    }
}

module.exports = VoiceController;