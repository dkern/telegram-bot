'use strict';

/**
 * broadcast messages to all registered users
 * @param {Messages} messages
 * @param {Storage} storage
 * @constructor
 */
let Broadcast = function(messages, storage) {
    this.messages = messages;
    this.storage = storage;
};

/**
 * send html message to all registered users
 * @param {string} message
 * @param {object} [replaces]
 * @returns {void}
 */
Broadcast.prototype.sendHtml = function(message, replaces) {
    Object.keys(this.storage.getUsers()).forEach(username => {
        this.messages.sendHtml(this.storage.getUser(username).chatId, message, replaces);
    });
};

/**
 * send markdown message to all registered users
 * @param {string} message
 * @param {object} [replaces]
 * @returns {void}
 */
Broadcast.prototype.sendMarkdown = function(message, replaces) {
    Object.keys(this.storage.getUsers()).forEach(username => {
        this.messages.sendMarkdown(this.storage.getUser(username).chatId, message, replaces);
    });
};

/**
 * send photo to all registered users
 * @param {string|stream.Stream|Buffer} image
 * @param {string} caption
 * @param {object} [replaces]
 * @returns {void}
 */
Broadcast.prototype.sendPhoto = function(image, caption, replaces) {
    Object.keys(this.storage.getUsers()).forEach(username => {
        this.messages.sendPhoto(this.storage.getUser(username).chatId, image, caption, replaces);
    });
};

/**
 * send text message to all registered users
 * @param {string} message
 * @param {object} [replaces]
 * @returns {void}
 */
Broadcast.prototype.sendText = function(message, replaces) {
    Object.keys(this.storage.getUsers()).forEach(username => {
        this.messages.sendText(this.storage.getUser(username).chatId, message, replaces);
    });
};

module.exports = Broadcast;
