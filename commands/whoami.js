'use strict';

/**
 * who am i command
 * @type {{cmd: string, description: string, showInHelp: boolean, register: module.exports.register}}
 */
let Command = {
    /**
     * command as string, used for help print
     * @type {string}
     */
    cmd: '/whoami',

    /**
     * command description, used for help
     * @type {string}
     */
    description: 'details about you',

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
        Command.description = instance.messages._('cmdWhoAmI');

        // register command on bot
        instance.bot.onText(/^\/whoami$/i, msg => {
            let message = instance.security.registered(msg.from.username) ? 'whoamiRegistered' : 'whoamiUnregistered';
            let since = instance.security.registeredSince(msg.from.username);

            instance.messages.sendMarkdown(msg.chat.id, message, {
                name: msg.from.username,
                date: since.date,
                time: since.time
            });
        });
    }
};

module.exports = Command;
