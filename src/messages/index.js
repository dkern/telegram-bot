'use strict';

let Formatter = require('./formatter');
let Broadcast = require('./broadcast');
let html = require('./types/html');
let markdown = require('./types/markdown');
let photo = require('./types/photo');
let text = require('./types/text');

/**
 * messages handler class
 * @param {TelegramBot} bot
 * @param {object} messages
 * @param {Storage} storage
 * @constructor
 */
let Messages = function(bot, messages, storage) {
    this.bot = bot;
    this.storage = storage;
    this.formatter = new Formatter(messages);
    this._ = this.formatter._.bind(this.formatter);
    this.broadcast = new Broadcast(this, storage);
};

/**
 * sends html message to specified chat
 * @param {string|number} chatId
 * @param {string} message
 * @param {object} [replaces]
 * @returns {Promise|void}
 */
Messages.prototype.sendHtml = function(chatId, message, replaces) {
    return html(this.bot, chatId, this._(message, replaces));
};

/**
 * sends html message to all registered users
 * @param {string} message
 * @param {object} [replaces]
 * @returns {void}
 */
Messages.prototype.sendHtmlBroadcast = function(message, replaces) {
    this.broadcast.sendHtml(message, replaces);
};

/**
 * sends markdown message to specified chat
 * @param {string|number} chatId
 * @param {string} message
 * @param {object} [replaces]
 * @returns {Promise|void}
 */
Messages.prototype.sendMarkdown = function(chatId, message, replaces) {
    return markdown(this.bot, chatId, this._(message, replaces));
};

/**
 * sends markdown message to all registered users
 * @param {string} message
 * @param {object} [replaces]
 * @returns {void}
 */
Messages.prototype.sendMarkdownBroadcast = function(message, replaces) {
    this.broadcast.sendMarkdown(message, replaces);
};

/**
 * sends photo to specified chat
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
 * sends photo to all registered users
 * @param {string|stream.Stream|Buffer} image
 * @param {string} caption
 * @param {object} [replaces]
 * @returns {void}
 */
Messages.prototype.sendPhotoBroadcast = function(image, caption, replaces) {
    this.broadcast.sendPhoto(image, caption, replaces);
};

/**
 * sends text message to specified chat
 * @param {string|number} chatId
 * @param {string} message
 * @param {object} [replaces]
 * @returns {Promise|void}
 */
Messages.prototype.sendText = function(chatId, message, replaces) {
    text(this.bot, chatId, this._(message, replaces));
};

/**
 * sends text message to all registered users
 * @param {string} message
 * @param {object} [replaces]
 * @returns {void}
 */
Messages.prototype.sendTextBroadcast = function(message, replaces) {
    this.broadcast.sendText(message, replaces);
};

module.exports = Messages;
