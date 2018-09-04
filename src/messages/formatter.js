'use strict';

/**
 * formatter for replaces in messages
 * @param {string} msg
 * @param {object} [replaces]
 * @returns string
 */
module.exports = (msg, replaces) => {
    let messages = require('./').config;
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