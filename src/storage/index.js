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
            let now = new Date();
            let day = now.getDate();
            let month = now.getMonth() + 1;
            let year = now.getFullYear();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();

            day = day < 10 ? '0' + day : day;
            month = month < 10 ? '0' + month : month;
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            storage.users[username] = {
                chatId: chatId,
                date: day + '.' + month + '.' + year,
                time: hours + ':' + minutes + ':' + seconds,
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
