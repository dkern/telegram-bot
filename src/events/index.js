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
