'use strict';

/**
 * help command
 * @type {{cmd: string, description: string, showInHelp: boolean, register: function}}
 */
let Command = {
    /**
     * command as string, used for help print
     * @type {string}
     */
    cmd: '/help',

    /**
     * command description, used for help
     * @type {string}
     */
    description: 'prints help',

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
        Command.description = instance.messages._('cmdHelp');

        // register command on bot
        instance.bot.onText(/^\/?help$/i, msg => {
            if (!instance.security.check(msg)) {
                return;
            }

            let help = instance.messages._('help') + '\n\n';
            let commands = instance.autoloader.getRegisteredCommands();

            Object.keys(commands).forEach(name => {
                if (commands[name].showInHelp) {
                    help += commands[name].cmd + ' - ' + commands[name].description + '\n';
                }
            });

            instance.messages.sendMarkdown(msg.chat.id, help);
        });
    }
};

module.exports = Command;
