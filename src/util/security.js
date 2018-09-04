'use strict';

let config = require('./../../config/bot');
let storage = require('../storage');

module.exports = {
    /**
     * check if a user message is allowed
     * @param {object} msg
     * @returns boolean
     */
    allowed: msg => {
        if (config.allowedUserWhitelist.indexOf(msg.from.username) >= 0) {
            return true;
        }

        return !config.useUserWhitelist;
    },

    /**
     * check if a user is registered with the bot
     * @param {string} username
     * @returns {boolean}
     */
    registered: username => {
        return !!storage.users[username];
    },

    /**
     * get user registration date
     * @param {string} username
     * @returns {string|null}
     */
    registeredSince: username => {
        if(storage.users[username]) {
            return storage.users[username].date;
        }

        return null;
    }
};