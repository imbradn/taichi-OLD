const Command = require('../../structures/Command.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['speak']
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        let sayMessage = args.join(" ")
        
        message.channel.send(sayMessage);
    }
};