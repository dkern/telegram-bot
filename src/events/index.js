'use strict';

let OneTimeListener = require('./onetime');

/**
 * events helper class
 * @param {TelegramBot} bot
 * @constructor
 */
let Events = function(bot) {
    this.bot = bot;
};

/**
 * register event listener on bot instance
 * @param {string} type
 * @param {function} callback
 * @returns {void}
 */
Events.prototype.on = function(type, callback) {
    this.bot.on(type, callback);
};

/**
 * unregister event listener on bot instance
 * @param {string} type
 * @param {function} callback
 * @returns {void}
 */
Events.prototype.off = function(type, callback) {
    this.bot.off(type, callback);
};

/**
 * create a one-time listener, optionally by type
 * @param {string|function} type
 * @param {function} [callback]
 * @returns {void}
 */
Events.prototype.one = function(type, callback) {
    // use message type by default
    if (typeof type === 'function') {
        callback = type;
        type = 'message';
    }

    OneTimeListener(this.bot, type, callback);
};

/**
 * only listen for next message, optionally by type
 * @param {string|function} type
 * @param {function} [callback]
 * @returns {void}
 */
Events.prototype.next = function(type, callback) {
    // use message type by default
    if (typeof type === 'function') {
        callback = type;
        type = 'message';
    }

    OneTimeListener(this.bot, type, callback);
};

module.exports = Events;
