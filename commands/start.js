'use strict';

/**
 * start command
 * @type {{cmd: string, description: string, showInHelp: boolean, register: module.exports.register}}
 */
let Command = {
    /**
     * command as string, used for help print
     * @type {string}
     */
    cmd: '/start',

    /**
     * command description, used for help
     * @type {string}
     */
    description: 'starts interacting',

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
        Command.description = instance.messages._('cmdStart');

        // register command on bot
        instance.bot.onText(/^\/start$/i, msg => {
            let chatId = msg.chat.id;
            instance.messages.sendMarkdown(chatId, 'start', {user: msg.from.username, name: instance.config.bot.name}).then(() => {
                if (!instance.security.allowed(msg)) {
                    instance.messages.sendMarkdown(chatId, 'userRejected');
                } else {
                    // write to cache
                    instance.storage.addUser(msg.from.username, chatId);
                    instance.messages.sendMarkdown(chatId, 'userAllowed').then(() => {
                        let help = messages._('help') + '\n\n';
                        let commands = instance.autoloader.getRegisteredCommands();

                        Object.keys(commands).forEach(name => {
                            if (commands[name].showInHelp) {
                                help += commands[name].cmd + ' - ' + commands[name].description + '\n';
                            }
                        });

                        instance.messages.sendMarkdown(chatId, help);
                    });
                }
            });
        });
    }
};

module.exports = Command;
