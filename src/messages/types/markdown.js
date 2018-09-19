'use strict';

let sendMessage = require("./message");

/**
 * send markdown message
 * @param {TelegramBot} bot
 * @param {number|string} chatId
 * @param {string} message
 * @returns {Promise}
 */
module.exports = (bot, chatId, message) => {
    return sendMessage(bot, chatId, message, {
        parse_mode: 'Markdown'
    });
};