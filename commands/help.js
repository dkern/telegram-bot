'use strict';

let messages = require('../src/messages');
let autoloader = require('../src/util/autoloader');

/**
 * help command
 * @param {TelegramBot} bot
 * @returns void
 */
module.exports = {
    /**
     * command as string, used for help print
     * @type {string}
     */
    cmd: '/help',

    /**
     * command description, used for help
     * @type {string}
     */
    description: messages.config.cmdHelp,

    /**
     * command register handler
     * @param {TelegramBot} bot
     * @returns {void}
     */
    register: bot => {
        bot.onText(/\/help/, msg => {
            let help = messages._('help') + '\n\n';
            let commands = autoloader.commands();

            Object.keys(commands).forEach(name => {
                help += commands[name].cmd + ' - ' + commands[name].description + '\n';
            });

            messages.sendMarkdown(bot, msg.chat.id, help);
        });
    }
};