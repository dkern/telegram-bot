'use strict';

/**
 * unregister command
 * @type {{cmd: string, description: string, showInHelp: boolean, register: function}}
 */
let Command = {
    /**
     * command as string, used for help print
     * @type {string}
     */
    cmd: '/unregister',

    /**
     * command description, used for help
     * @type {string}
     */
    description: 'unregister yourself',

    /**
     * show command in help message
     * @type {boolean}
     */
    showInHelp: true,

    /**
     * command handler
     * @param {TelegramBotWrapper} instance
     * @returns {void}
     */
    register: instance => {
        // overwrite description by instance messages
        Command.description = instance.messages._('cmdUnregister');

        // register command on bot
        instance.bot.onText(/^\/unregister$/i, msg => {
            instance.storage.removeUser(msg.from.username);
            instance.messages.sendMarkdown(msg.chat.id, 'unregistered');
        });
    }
};

module.exports = Command;
