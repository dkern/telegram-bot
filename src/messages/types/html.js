'use strict';

/**
 * send html message
 * @param {TelegramBot} bot
 * @param {number|string} chatId
 * @param {string} message
 * @returns {Promise}
 */
module.exports = (bot, chatId, message) => {
    return bot.sendMessage(chatId, message, {
        parse_mode: 'HTML'
    });
};