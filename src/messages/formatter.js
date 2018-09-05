'use strict';

let config = require('../config');

/**
 * formatter for replaces in messages
 * @param {string} msg
 * @param {object} [replaces]
 * @returns string
 */
module.exports = (msg, replaces) => {
    msg = config.messages[msg] || msg;

    // select random message if is an array
    if (Array.isArray(msg)) {
        msg = msg[Math.floor(Math.random() * msg.length)];
    }

    Object.keys(replaces || {}).forEach(key => {
        msg = msg.replace('${' + key + '}', replaces[key]);
    });

    return msg;
};