'use strict';

let messages = require('../src/messages');
let storage = require('../src/storage');

module.exports = {
    /**
     * command as string, used for help print
     * @type {string}
     */
    cmd: '/unregister',

    /**
     * command description, used for help
     * @type {string}
     */
    description: messages.config.cmdUnregister,

    /**
     * show command in help message
     * @type {boolean}
     */
    showInHelp: true,

    /**
     * command handler
     * @param {TelegramBot} bot
     * @returns {void}
     */
    register: bot => {
        bot.onText(/^\/unregister$/i, msg => {
            storage.removeUser(msg.from.username);
            messages.sendMarkdown(msg.chat.id, 'unregistered');
        });
    }
};