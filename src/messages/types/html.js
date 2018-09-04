'use strict';

let formatter = require('../formatter');

/**
 * send html message
 * @param {TelegramBot} bot
 * @param {number|string} chatId
 * @param {string} msg
 * @param {object} replaces
 * @returns {Promise}
 */
module.exports = (bot, chatId, msg, replaces) => {
    return bot.sendMessage(chatId, formatter(msg, replaces), {parse_mode: 'HTML'});
};