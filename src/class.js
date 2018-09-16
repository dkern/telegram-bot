'use strict';

let path = require('path');
let Config = require('./config');
let Storage = require('./storage');
let Messages = require('./messages');
let Security = require('./util/security');
let Autoloader = require('./util/autoloader');
let TelegramBot = require('node-telegram-bot-api');
let defaultMessages = require('../config/messages');

/**
 * start telegram bot with given configuration
 * @param {object} botConfig
 * @param {object} messagesConfig
 * @returns {object}
 */
let TelegramBotWrapper = function(botConfig, messagesConfig) {
    // suppress deprecation log;
    process.env.NTBA_FIX_319 = true;

    // get configuration instance
    this.config = new Config(botConfig, defaultMessages, messagesConfig);

    // start bot and initialize sub-classes
    this.bot = new TelegramBot(this.config.bot.token, this.config.bot.options);
    this.storage = new Storage(this.config.bot.storage.directory, this.config.bot.storage.file);
    this.messages = new Messages(this.bot, this.config.messages, this.storage);
    this.security = new Security(this.config, this.messages, this.storage);
    this.autoloader = new Autoloader(this, this.bot, this.messages);

    console.log(this.messages._('serverStarting', {name: this.config.bot.name}));
    this.messages.broadcast.sendMarkdown('started');

    // on errors
    this.bot.on('polling_error', err => console.log(err));

    // process stop
    let instance = this;
    process.on('SIGINT', () => {
        instance.messages.broadcast.sendMarkdown('stopped');
        console.log(instance.messages._('serverStopping', {name: instance.config.bot.name}));
        setTimeout(() => process.exit(0), 200);
    });

    // add core commands
    try {
        let module = require.resolve('telegram-bot');
        this.autoloader.addCommandsDir(path.dirname(module) + '/commands');
    }
    catch(e) {}

    // add commands from cwd
    let cwd = process.cwd() + '/commands';
    this.autoloader.addCommandsDir(cwd);
};

/**
 * register all commands and start polling
 * @returns {Promise}
 */
TelegramBotWrapper.prototype.start = function() {
    this.autoloader.registerCommands();
    return this.bot.startPolling();
};

/**
 * get telegram bot instance
 * @returns {TelegramBot}
 */
TelegramBotWrapper.prototype.getBot = function() {
    return this.bot;
};

/**
 * get config object
 * @returns {object}
 */
TelegramBotWrapper.prototype.getConfig = function() {
    return this.config;
};

/**
 * get storage instance
 * @returns {Storage}
 */
TelegramBotWrapper.prototype.getStorage = function() {
    return this.storage;
};

/**
 * get security instance
 * @returns {Security}
 */
TelegramBotWrapper.prototype.getSecurity = function() {
    return this.security;
};

/**
 * get messages instance
 * @returns {object}
 */
TelegramBotWrapper.prototype.getMessages = function() {
    return this.messages;
};

/**
 * get autoloader instance
 * @returns {object}
 */
TelegramBotWrapper.prototype.getAutoloader = function() {
    return this.autoloader;
};

module.exports = TelegramBotWrapper;
