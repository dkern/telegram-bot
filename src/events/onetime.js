'use strict';

/**
 * create a one-time listener
 * @param {TelegramBot} bot
 * @param {string} type
 * @param {function} [callback]
 * @returns {void}
 */
let OneTimeListener = function(bot, type, callback) {
    let listener = function() {
        bot.off(type, listener);
        callback.apply(this, arguments);
    };

    bot.on(type, listener);
};

module.exports = OneTimeListener;
