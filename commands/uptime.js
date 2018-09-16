'use strict';

let datetime = require('../src/util/datetime');

/**
 * uptime command
 * @type {{cmd: string, description: string, showInHelp: boolean, register: function}}
 */
let Command = {
    /**
     * command as string, used for help print
     * @type {string}
     */
    cmd: '/uptime',

    /**
     * command description, used for help
     * @type {string}
     */
    description: 'uptime info',

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
        Command.description = instance.messages._('cmdUptime');

        // register command on bot
        instance.bot.onText(/^\/?uptime$/i, msg => {
            if (!instance.security.check(msg)) {
                return;
            }

            // uptime
            let uptime = process.uptime();
            let seconds = parseInt(uptime, 10);

            instance.messages.sendMarkdown(msg.chat.id, 'uptime', {
                date: datetime.getDate(Date.now() - seconds),
                time: datetime.getTime(Date.now() - seconds),
                uptime: datetime.getRuntime(uptime)
            });
        });
    }
};

module.exports = Command;
