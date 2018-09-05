'use strict';

let config = require('../config');
let storage = require('../storage');
let messages = require('../messages');

let security = {
    /**
     * checks if a user is allowed and registered
     * @param {TelegramBot} bot
     * @param {string|number|object} chatId
     * @param {string|object} [username]
     * @returns {boolean}
     */
    check: (bot, chatId, username) => {
        if (!username && Object.prototype.toString.call(chatId) === '[object Object]') {
            username = chatId.from.username;
            chatId = chatId.chat.id;
        }

        if (!security.allowed(username)) {
            messages.sendText(bot, chatId, 'userRejected');
            return false;
        }

        if (!security.registered(username)) {
            messages.sendText(bot, chatId, 'userUnregistered');
            return false;
        }

        return true;
    },

    /**
     * check if a user message is allowed
     * @param {string|object} username
     * @returns boolean
     */
    allowed: username => {
        if (username.from && username.from.username) {
            username = username.from.username;
        }

        if (config.bot.allowedUserWhitelist.indexOf(username) >= 0) {
            return true;
        }

        return !config.bot.useUserWhitelist;
    },

    /**
     * check if a user is registered with the bot
     * @param {string} username
     * @returns {boolean}
     */
    registered: username => {
        if (username.from && username.from.username) {
            username = username.from.username;
        }

        return !!storage.users[username];
    },

    /**
     * get user registration date
     * @param {string} username
     * @returns {object|null}
     */
    registeredSince: username => {
        let since = {date: null, time: null};
        
        if(storage.users[username]) {
            since.date = storage.users[username].date;
            since.time = storage.users[username].time;
        }

        return since;
    }
};

module.exports = security;
