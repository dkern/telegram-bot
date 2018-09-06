'use strict';

let extend = require('extend');

/**
 * start telegram bot with given configuration
 * @param {object} botConfig
 * @param {object} messagesConfig
 * @returns {object}
 */
let TelegramBotWrapper = function(botConfig, messagesConfig) {
    let config = require('./config');
    config.bot = botConfig;

    // merge messages with default messages
    let defaultMessages = require('../config/messages');
    extend(config.messages, defaultMessages, messagesConfig);

    let messages = require('./messages');
    let autoloader = require('./util/autoloader');
    let TelegramBot = require('node-telegram-bot-api');

    // start bot
    let bot = new TelegramBot(config.bot.token, config.bot.options);
    messages.bot = bot;

    console.log(messages._('serverStarting', {name: config.bot.name}));
    messages.broadcast.sendMarkdown('started');
    autoloader.registerCommands(bot, autoloader.getCommands());

    // on errors
    bot.on('polling_error', err => console.log(err));

    // process stop
    process.on('SIGINT', () => {
        messages.broadcast.sendMarkdown('stopped');
        console.log(messages._('serverStopping', {name: config.bot.name}));
        setTimeout(() => process.exit(0), 200);
    });

    this.bot = bot;
    this.config = config;
    this.messages = messages;
    this.autoloader = autoloader;
};

/**
 * get telegram bot instance
 * @return {TelegramBot}
 */
TelegramBotWrapper.prototype.getBot = function() {
    return this.bot;
};

/**
 * get config object
 * @return {object}
 */
TelegramBotWrapper.prototype.getConfig = function() {
    return this.config;
};

/**
 * get messages object
 * @returns {object}
 */
TelegramBotWrapper.prototype.getMessages = function() {
    return this.messages;
};

/**
 * get autoloader object
 * @return {object}
 */
TelegramBotWrapper.prototype.getAutoloader = function() {
    return this.autoloader;
};

module.exports = TelegramBotWrapper;
