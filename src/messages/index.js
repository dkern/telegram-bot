'use strict';

let Formatter = require('./formatter');
let html = require('./types/html');
let markdown = require('./types/markdown');
let photo = require('./types/photo');
let text = require('./types/text');

/**
 * messages handler class
 * @param {TelegramBot} bot
 * @param {object} config
 * @param {Storage} storage
 * @constructor
 */
let Messages = function(bot, config, storage) {
    this.bot = bot;
    this.storage = storage;
    this.formatter = new Formatter(config);
    this._ = this.formatter._;
};

/**
 * send html message to specified chat
 * @param {string|number} chatId
 * @param {string} message
 * @param {object} [replaces]
 * @returns {Promise|void}
 */
Messages.prototype.sendHtml = function(chatId, message, replaces) {
    return html(this.bot, chatId, this._(message, replaces));
};

/**
 * send html message to all registered users
 * @param {string} message
 * @param {object} [replaces]
 * @returns {void}
 */
Messages.prototype.sendHtmlBroadcast = function(message, replaces) {
    Object.keys(this.storage.getUsers()).forEach(username => {
        // noinspection JSIgnoredPromiseFromCall
        this.sendHtml(this.storage.getUser(username).chatId, message, replaces);
    });
};

/**
 * send markdown message to specified chat
 * @param {string|number} chatId
 * @param {string} message
 * @param {object} [replaces]
 * @returns {Promise|void}
 */
Messages.prototype.sendMarkdown = function(chatId, message, replaces) {
    return markdown(this.bot, chatId, this._(message, replaces));
};

/**
 * send markdown message to all registered users
 * @param {string} message
 * @param {object} [replaces]
 * @returns {void}
 */
Messages.prototype.sendMarkdownBroadcast = function(message, replaces) {
    Object.keys(this.storage.getUsers()).forEach(username => {
        // noinspection JSIgnoredPromiseFromCall
        this.sendMarkdown(this.storage.getUser(username).chatId, message, replaces);
    });
};

/**
 * send photo to specified chat
 * @param {string|number} chatId
 * @param {string|stream.Stream|Buffer} image
 * @param {string} caption
 * @param {object} [replaces]
 * @returns {Promise|void}
 */
Messages.prototype.sendPhoto = function(chatId, image, caption, replaces) {
    return photo(this.bot, chatId, image, this._(caption, replaces));
};

/**
 * send photo to all registered users
 * @param {string|stream.Stream|Buffer} image
 * @param {string} caption
 * @param {object} [replaces]
 * @returns {void}
 */
Messages.prototype.sendPhotoBroadcast = function(image, caption, replaces) {
    Object.keys(this.storage.getUsers()).forEach(username => {
        // noinspection JSIgnoredPromiseFromCall
        this.sendPhoto(this.storage.getUser(username).chatId, image, caption, replaces);
    });
};

/**
 * send text message to specified chat
 * @param {string|number} chatId
 * @param {string} message
 * @param {object} [replaces]
 * @returns {Promise|void}
 */
Messages.prototype.sendText = function(chatId, message, replaces) {
    text(this.bot, chatId, this._(message, replaces));
};

/**
 * send text message to all registered users
 * @param {string} message
 * @param {object} [replaces]
 * @returns {void}
 */
Messages.prototype.sendTextBroadcast = function(message, replaces) {
    Object.keys(this.storage.getUsers()).forEach(username => {
        // noinspection JSIgnoredPromiseFromCall
        this.sendText(this.storage.getUser(username).chatId, message, replaces);
    });
};

/**
 * broadcast messages to all registered users
 * @type {
 *  {sendHtml: Messages.broadcast.sendHtml,
 *  sendMarkdown: Messages.broadcast.sendMarkdown,
 *  sendPhoto: Messages.broadcast.sendPhoto,
 *  sendText: Messages.broadcast.sendText}
 * }
 */
Messages.prototype.broadcast = {
    /**
     * send html message to all registered users
     * @param {string} message
     * @param {object} [replaces]
     * @returns {void}
     */
    sendHtml: (message, replaces) => {
        this.sendHtmlBroadcast(message, replaces);
    },

    /**
     * send markdown message to all registered users
     * @param {string} message
     * @param {object} [replaces]
     * @returns {void}
     */
    sendMarkdown: (message, replaces) => {
        this.sendMarkdownBroadcast(message, replaces);
    },

    /**
     * send photo to all registered users
     * @param {string|stream.Stream|Buffer} image
     * @param {string} caption
     * @param {object} [replaces]
     * @returns {void}
     */
    sendPhoto: (image, caption, replaces) => {
        this.sendPhotoBroadcast(image, caption, replaces)
    },

    /**
     * send text message to all registered users
     * @param {string} message
     * @param {object} [replaces]
     * @returns {void}
     */
    sendText: (message, replaces) => {
        this.sendTextBroadcast(message, replaces);
    },
};

module.exports = messages;
