'use strict';

let config = require('../src/config');
let messages = require('../src/messages');

/**
 * say hello command
 * @param {TelegramBot} bot
 * @returns void
 */
module.exports = {
    /**
     * command as string, used for help print
     * @type {string}
     */
    cmd: '/sayhello',

    /**
     * command description, used for help
     * @type {string}
     */
    description: messages.config.cmdSayHello,

    /**
     * show command in help message
     * @type {boolean}
     */
    showInHelp: true,

    /**
     * command register handler
     * @param {TelegramBot} bot
     * @returns {void}
     */
    register: bot => {
        bot.onText(/^\/sayhello$/i, msg => {
            messages.sendMarkdown(bot, msg.chat.id, 'start', {
                user: msg.from.username,
                name: config.bot.name
            });
        });
    }
};