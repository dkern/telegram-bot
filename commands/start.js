'use strict';

let config = require('../src/config');
let messages = require('../src/messages');
let storage = require('../src/storage');
let autoloader = require('../src/util/autoloader');

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
     * show command in help message
     * @type {boolean}
     */
    showInHelp: true,

    /**
     * command handler
     * @param {TelegramBot} bot
     * @param {object} messages
     * @param {object} security
     * @returns {void}
     */
    register: (bot, messages, security) => {
        bot.onText(/^\/start$/i, msg => {
            let chatId = msg.chat.id;
            messages.sendMarkdown(chatId, 'start', {user: msg.from.username, name: config.bot.name}).then(() => {
                if (!security.allowed(msg)) {
                    messages.sendMarkdown(chatId, 'userRejected');
                } else {
                    // write to cache
                    storage.addUser(msg.from.username, chatId);
                    messages.sendMarkdown(chatId, 'userAllowed').then(() => {
                        let help = messages._('help') + '\n\n';
                        let commands = autoloader.getCommands();

                        Object.keys(commands).forEach(name => {
                            if (commands[name].showInHelp) {
                                help += commands[name].cmd + ' - ' + commands[name].description + '\n';
                            }
                        });

                        messages.sendMarkdown(chatId, help);
                    });
                }
            });
        });
    }
};