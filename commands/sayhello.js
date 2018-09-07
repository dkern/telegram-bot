'use strict';

/**
 * say hello command
 * @type {{cmd: string, description: string, showInHelp: boolean, register: module.exports.register}}
 */
let Command = {
    /**
     * command as string, used for help print
     * @type {string}
     */
    cmd: '/sayhello',

    /**
     * command description, used for help
     * @type {string}
     */
    description: 'say hello',

    /**
     * show command in help message
     * @type {boolean}
     */
    showInHelp: true,

    /**
     * command register handler
     * @param {TelegramBotWrapper} instance
     * @returns {void}
     */
    register: instance => {
        // overwrite description by instance messages
        Command.description = instance.messages._('cmdSayHello');

        // register command on bot
        instance.bot.onText(/^\/sayhello$/i, msg => {
            instance.messages.sendMarkdown(msg.chat.id, 'start', {
                user: msg.from.username,
                name: instance.config.bot.name
            });
        });
    }
};

module.exports = Command;
