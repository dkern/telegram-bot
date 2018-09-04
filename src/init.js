'use strict';

/**
 * start telegram bot with given configuration
 * @param {object} botConfig
 * @param {object} messagesConfig
 * @returns {object}
 */
module.exports = (botConfig, messagesConfig) => {
    let config = require('./config');

    config.bot = botConfig;
    config.messages = messagesConfig;

    let messages = require('./messages');
    let security = require('./util/security');
    let autoloader = require('./util/autoloader');
    let TelegramBot = require('node-telegram-bot-api');

    // start bot
    console.log(messages._('serverStarting', {name: config.bot.name}));
    let bot = new TelegramBot(config.bot.token, config.bot.options);

    // default error handler
    bot.on('polling_error', err => {
        console.log(err);
    });

    // register commands
    let commands = autoloader.getCommands();
    Object.keys(commands).forEach(name => {
        commands[name].register(bot, security);
        console.log(messages._('serverRegisterCms', {cmd: name}));
    });

    // process stop
    process.on('SIGINT', () => {
        console.log(messages._('serverStopping', {name: config.bot.name}));
        process.exit(0);
    });

    return {
        bot: bot,
        messages: messages,
        addCommand: autoloader.addCommand
    };
};
