'use strict';

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
    cmd: '/uptime',

    /**
     * command description, used for help
     * @type {string}
     */
    description: messages.config.cmdUptime,

    /**
     * command register handler
     * @param {TelegramBot} bot
     * @param {object} security
     * @returns {void}
     */
    register: (bot, security) => {
        bot.onText(/^\/?uptime$/i, msg => {
            if (!security.check(bot, msg)) {
                return;
            }
            
            // uptime
            let uptime = process.uptime();
            let seconds = parseInt(uptime, 10);
            let upHours   = Math.floor(seconds / 3600);
            let upMinutes = Math.floor((seconds - (upHours * 3600)) / 60);
            let upSeconds = seconds - (upHours * 3600) - (upMinutes * 60);

            let upStr = upHours > 0 ? upHours + 'h ' : '';
            upStr += upMinutes > 0 ? upMinutes + 'm ' : '';
            upStr += upSeconds + 's';

            // starting date / time
            let now = new Date(Date.now() - seconds);
            let stDay = now.getDate();
            let stMonth = now.getMonth() + 1;
            let stYear = now.getFullYear();
            let stHours = now.getHours();
            let stMinutes = now.getMinutes();
            let stSeconds = now.getSeconds();

            stDay = stDay < 10 ? '0' + stDay : stDay;
            stMonth = stMonth < 10 ? '0' + stMonth : stMonth;
            stHours = stHours < 10 ? '0' + stHours : stHours;
            stMinutes = stMinutes < 10 ? '0' + stMinutes : stMinutes;
            stSeconds = stSeconds < 10 ? '0' + stSeconds : stSeconds;

            // send
            messages.sendMarkdown(bot, msg.chat.id, 'uptime', {
                date: stDay + '.' + stMonth + '.' + stYear,
                time: stHours + ':' + stMinutes + ':' + stSeconds,
                uptime: upStr
            });
        });
    }
};