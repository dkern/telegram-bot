'use strict';

let sendMessage = require("./message");

/**
 * send plain text message
 * @param {TelegramBot} bot
 * @param {number|string} chatId
 * @param {string} message
 * @returns {Promise}
 */
module.exports = (bot, chatId, message) => {
    return sendMessage(bot, chatId, message);
};