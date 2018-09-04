'use strict';

let config = require('../config/bot');
let messages = require('../src/messages');
let storage = require('../src/storage');

module.exports = {
    /**
     * command as string, used for help print
     * @type {string}
     */
    cmd: '/start',

    /**
     * command description, used for help
     * @type {string}
     */
    description: messages.config.cmdStart,

    /**
     * command handler
     * @param {TelegramBot} bot
     * @param {object} security
     * @returns {void}
     */
    register: (bot, security) => {
        bot.onText(/\/start/, msg => {
            let chatId = msg.chat.id;
            messages.sendMarkdown(bot, chatId, 'start', {name: config.name});

            if (!security.allowed(msg)) {
                messages.sendText(bot, chatId, 'userRejected');
            } else {
                messages.sendText(bot, chatId, 'userAllowed');

                // write to cache
                storage.addUser(msg.from.username, chatId);
            }
        });
    }
};