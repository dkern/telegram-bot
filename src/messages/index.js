'use strict';

let formatter = require('./formatter');
let storage = require('../storage');

let messages = {
    config: require('./../../config/messages'),
    _: formatter,
    sendHtml: require('./types/html'),
    sendMarkdown: require('./types/markdown'),
    sendText: require('./types/text'),
    broadcast: {
        sendHtml: (bot, msg, replaces) => {
            Object.keys(storage.users).forEach(username => {
                messages.sendHtml(bot, storage.users[username].chatId, msg, replaces);
            });
        },
        sendMarkdown: (bot, msg, replaces) => {
            Object.keys(storage.users).forEach(username => {
                messages.sendMarkdown(bot, storage.users[username].chatId, msg, replaces);
            });
        },
        sendText: (bot, msg, replaces) => {
            Object.keys(storage.users).forEach(username => {
                messages.sendText(bot, storage.users[username].chatId, msg, replaces);
            });
        },
    }
};

module.exports = messages;