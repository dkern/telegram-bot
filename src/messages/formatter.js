'use strict';

/**
 * message formation helper
 * @param {object} messages
 * @constructor
 */
let Formatter = function(messages) {
    this.messages = messages;
};

/**
 * formatter for replaces in messages
 * @param {string|Array} message
 * @param {object} [replaces]
 * @returns string
 */
Formatter.prototype._ = function(message, replaces) {
    message = this.messages[message] || message;

    // select random message if is an array
    if (Array.isArray(message)) {
        message = message[Math.floor(Math.random() * message.length)];
    }

    // replace values
    Object.keys(replaces || {}).forEach(key => {
        message = message.replace('${' + key + '}', replaces[key]);
    });

    return message;
};

module.exports = Formatter;
