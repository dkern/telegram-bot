'use strict';

let Formatter = require('./formatter');
let Broadcast = require('./broadcast');

let typeHtml = require('./types/html');
let typeMarkdown = require('./types/markdown');
let typeMessage = require('./types/message');
let typePhoto = require('./types/photo');
let typeText = require('./types/text');

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
    return typeHtml(this.bot, chatId, this._(message, replaces));
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
    return typeMarkdown(this.bot, chatId, this._(message, replaces));
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
 * sends markdown message to specified chat
 * @param {string|number} chatId
 * @param {string} message
 * @param {object} [replaces]
 * @param {object} [options]
 * @returns {Promise|void}
 */
Messages.prototype.sendMessage = function(chatId, message, replaces, options) {
    return typeMessage(this.bot, chatId, this._(message, replaces), options);
};

/**
 * sends markdown message to all registered users
 * @param {string} message
 * @param {object} [replaces]
 * @param {object} [options]
 * @returns {void}
 */
Messages.prototype.sendMessageBroadcast = function(message, replaces, options) {
    this.broadcast.sendMessage(message, replaces, options);
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
    return typePhoto(this.bot, chatId, image, this._(caption, replaces));
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
    return typeText(this.bot, chatId, this._(message, replaces));
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
