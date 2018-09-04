'use strict';

let reader = require('./reader');
let writer = require('./writer');

let storage = {
    /**
     * users
     * @type {*}
     */
    users: {},

    /**
     * reads in updated user data to object
     * @return {void}
     */
    updateUsers: () => {
        storage.users = reader.readUsers();
    },

    /**
     * adds a new user
     * @param {string} username
     * @param {string|number} chatId
     * @return {void}
     */
    addUser: (username, chatId) => {
        storage.updateUsers();

        if (!storage.users[username]) {
            storage.users[username] = {
                chatId: chatId,
                date: Date.now()
            };
        }
        else {
            storage.users[username].chatId = chatId;
        }

        writer.writeUsers(storage.users);
    },

    /**
     * removes a user
     * @param {string} username
     * @return {void}
     */
    removeUser: username => {
        storage.updateUsers();
        delete storage.users[username];
        writer.writeUsers(storage.users);
    },
};

// initial read-in
storage.updateUsers();

module.exports = storage;
