'use strict';

/**
 * send photo
 * @param {TelegramBot} bot
 * @param {number|string} chatId
 * @param {string|stream.Stream|Buffer} photo
 * @param {string} [caption]
 * @returns {Promise}
 */
module.exports = (bot, chatId, photo, caption) => {
    return bot.sendPhoto(chatId, photo, caption ? {caption: caption} : {});
};