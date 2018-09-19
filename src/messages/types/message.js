'use strict';

/**
 * send markdown message
 * @param {TelegramBot} bot
 * @param {number|string} chatId
 * @param {string} message
 * @param {object} [options]
 * @returns {Promise}
 */
module.exports = (bot, chatId, message, options) => {
    return bot.sendMessage(chatId, message, options || {});
};