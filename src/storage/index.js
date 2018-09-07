'use strict';

let Reader = require('./reader');
let Writer = require('./writer');
let datetime = require('../util/datetime');

/**
 * user registration storage class
 * @constructor
 */
let Storage = function(dir, file) {
    this.users = {};
    this.reader = new Reader(dir, file);
    this.writer = new Writer(dir, file);

    this.updateUsers();
};

/**
 * get current users object
 * @returns {object}
 */
Storage.prototype.getUsers = function() {
    return this.users;
};

/**
 * get current users object
 * @returns {object}
 */
Storage.prototype.getUser = function(username) {
    return this.users[username];
};

/**
 * reads in updated user data and remove invalid names
 * @return {void}
 */
Storage.prototype.updateUsers = function() {
    this.users = this.reader.readUsers();
};

/**
 * adds a new user
 * @param {string} username
 * @param {string|number} chatId
 * @return {void}
 */
Storage.prototype.addUser = function(username, chatId) {
    this.updateUsers();

    if (!this.users[username]) {
        this.users[username] = {
            chatId: chatId,
            date: datetime.getDate(),
            time: datetime.getTime(),
        };
    }
    else {
        this.users[username].chatId = chatId;
    }

    this.writer.writeUsers(this.users);
};

/**
 * removes a user
 * @param {string} username
 * @return {void}
 */
Storage.prototype.removeUser = function(username) {
    this.updateUsers();
    delete this.users[username];
    this.writer.writeUsers(this.storage.users);
};

module.exports = Storage;
