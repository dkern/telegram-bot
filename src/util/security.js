'use strict';

/**
 * security helpers
 * @param {object} config
 * @param {Messages} messages
 * @param {Storage} storage
 * @constructor
 */
let Security = function(config, messages, storage) {
    this.config = config;
    this.storage = storage;
    this.messages = messages;
};

/**
 * checks if a user is allowed and registered
 * @param {string|number|object|TelegramBotMessage} chatId
 * @param {string|object} [username]
 * @returns {boolean}
 */
Security.prototype.check = function(chatId, username) {
    // make it possible to pass massage object too
    if (!username && Object.prototype.toString.call(chatId) === '[object Object]') {
        username = chatId.from.username;
        chatId = chatId.chat.id;
    }

    if (!this.allowed(username)) {
        this.messages.sendMarkdown(chatId, 'userRejected');
        return false;
    }

    if (!this.registered(username)) {
        this.messages.sendMarkdown(chatId, 'userUnregistered');
        return false;
    }

    return true;
};

/**
 * check if a user message is allowed by whitelist
 * @param {string|object|TelegramBotMessage} username
 * @returns boolean
 */
Security.prototype.allowed = function(username) {
    if (username.from && username.from.username) {
        username = username.from.username;
    }

    if (this.config.bot.allowedUserWhitelist.indexOf(username) >= 0) {
        return true;
    }

    return !this.config.bot.useUserWhitelist;
};

/**
 * check if a user is registered with the bot
 * @param {string|TelegramBotMessage} username
 * @returns {boolean}
 */
Security.prototype.registered = function(username) {
    if (username.from && username.from.username) {
        username = username.from.username;
    }

    return !!this.storage.users[username];
};

/**
 * get user registration date
 * @param {string} username
 * @returns {object|null}
 */
Security.prototype.registeredSince = function(username) {
    let since = {date: null, time: null};

    if (this.storage.getUser(username)) {
        since.date = this.storage.getUser(username).date;
        since.time = this.storage.getUser(username).time;
    }

    return since;
};

module.exports = Security;
