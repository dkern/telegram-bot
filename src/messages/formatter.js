'use strict';

let messages = require('./../../config/messages');

/**
 * formatter for replaces in messages
 * @param {string} msg
 * @param {object} [replaces]
 * @returns string
 */
module.exports = (msg, replaces) => {
    msg = messages[msg] || msg;

    // select random message if is an array
    if (Array.isArray(msg)) {
        msg = msg[Math.floor(Math.random()*msg.length)];
    }

    Object.keys(replaces || {}).forEach(key => {
        msg = msg.replace('${' + key + '}', replaces[key]);
    });

    return msg;
};