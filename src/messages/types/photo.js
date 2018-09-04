'use strict';

let formatter = require('../formatter');

/**
 * send text message
 * @param {TelegramBot} bot
 * @param {number|string} chatId
 * @param {string|stream.Stream|Buffer} photo
 * @param {string} [caption]
 * @param {object} [replaces]
 * @returns {Promise}
 */
module.exports = (bot, chatId, photo, caption, replaces) => {
    let opts = caption ? {caption: formatter(caption, replaces)} : {};
    return bot.sendPhoto(chatId, photo, opts);
};