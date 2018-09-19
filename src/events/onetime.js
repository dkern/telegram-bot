'use strict';

/**
 * create a one-time listener
 * @param {TelegramBot} bot
 * @param {string} type
 * @param {function} [callback]
 * @returns {void}
 */
let OneTimeListener = function(bot, type, callback) {
    let listener = (...args) => {
        bot.off(type, listener);
        callback.apply(this, args);
    };

    bot.on(type, listener);
};

module.exports = OneTimeListener;
