'use strict';

let messages = require('../src/messages');

/**
 * who am i command
 * @param {TelegramBot} bot
 * @returns void
 */
module.exports = {
    /**
     * command as string, used for help print
     * @type {string}
     */
    cmd: '/whoami',

    /**
     * command description, used for help
     * @type {string}
     */
    description: messages.config.cmdWhoAmI,

    /**
     * command register handler
     * @param {TelegramBot} bot
     * @param {object} security
     * @returns {void}
     */
    register: (bot, security) => {
        bot.onText(/^\/whoami$/i, msg => {
            let message = security.registered(msg.from.username) ? 'whoamiRegistered' : 'whoamiUnregistered';
            let since = security.registeredSince(msg.from.username);

            messages.sendMarkdown(bot, msg.chat.id, message, {
                name: msg.from.username,
                date: since.date,
                time: since.time
            });
        });
    }
};