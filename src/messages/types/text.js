'use strict';

/**
 * send plain text message
 * @param {TelegramBot} bot
 * @param {number|string} chatId
 * @param {string} message
 * @returns {Promise}
 */
module.exports = (bot, chatId, message) => {
    return bot.sendMessage(chatId, message);
};