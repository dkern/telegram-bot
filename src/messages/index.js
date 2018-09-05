'use strict';

let config = require('../config');
let formatter = require('./formatter');
let storage = require('../storage');
let html = require('./types/html');
let markdown = require('./types/markdown');
let photo = require('./types/photo');
let text = require('./types/text');

let messages = {
    /**
     * bot instance
     * @type {TelegramBot}
     */
    bot: null,

    /**
     * messages config
     * @type {*}
     */
    config: config.messages,

    /**
     * formatter instance
     * @type {function}
     */
    _: formatter,

    /**
     * send html message to specified chat
     * @param {string|number} chatId
     * @param {string} message
     * @param {object} [replaces]
     * @returns {Promise}
     */
    sendHtml: (chatId, message, replaces) => html(messages.bot, chatId, messages._(message, replaces)),

    /**
     * send markdown message to specified chat
     * @param {string|number} chatId
     * @param {string} message
     * @param {object} [replaces]
     * @returns {Promise}
     */
    sendMarkdown: (chatId, message, replaces) => markdown(messages.bot, chatId, messages._(message, replaces)),

    /**
     * send photo to specified chat
     * @param {string|number} chatId
     * @param {string|stream.Stream|Buffer} image
     * @param {string} caption
     * @param {object} [replaces]
     * @returns {Promise}
     */
    sendPhoto: (chatId, image, caption, replaces) => photo(messages.bot, chatId, image, messages._(caption, replaces)),

    /**
     * send text message to specified chat
     * @param {string|number} chatId
     * @param {string} message
     * @param {object} [replaces]
     * @returns {Promise}
     */
    sendText: (chatId, message, replaces) => text(messages.bot, chatId, messages._(message, replaces)),

    /**
    * broadcast helper
     * @type {*}
     */
    broadcast: {
        /**
         * send html message to all registered users
         * @param {string} message
         * @param {object} [replaces]
         * @returns {void}
         */
        sendHtml: (message, replaces) => {
            Object.keys(storage.users).forEach(username => {
                messages.sendHtml(storage.users[username].chatId, message, replaces);
            });
        },

        /**
         * send markdown message to all registered users
         * @param {string} message
         * @param {object} [replaces]
         * @returns {void}
         */
        sendMarkdown: (message, replaces) => {
            Object.keys(storage.users).forEach(username => {
                messages.sendMarkdown(storage.users[username].chatId, message, replaces);
            });
        },

        /**
         * send photo to all registered users
         * @param photo
         * @param {string} caption
         * @param {object} [replaces]
         * @returns {void}
         */
        sendPhoto: (photo, caption, replaces) => {
            Object.keys(storage.users).forEach(username => {
                messages.sendPhoto(storage.users[username].chatId, photo, caption, replaces);
            });
        },

        /**
         * send text message to all registered users
         * @param {string} message
         * @param {object} [replaces]
         * @returns {void}
         */
        sendText: (message, replaces) => {
            Object.keys(storage.users).forEach(username => {
                messages.sendText(storage.users[username].chatId, message, replaces);
            });
        },
    }
};

module.exports = messages;