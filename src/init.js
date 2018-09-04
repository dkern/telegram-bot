'use strict';

let messages = require('./messages');
let security = require('./util/security');
let autoloader = require('./util/autoloader');
let TelegramBot = require('node-telegram-bot-api');

/**
 * start telegram bot with given configuration
 * @param {object} botConfig
 * @param {object} messagesConfig
 * @returns {object}
 */
module.exports = (botConfig, messagesConfig) => {
    let config = botConfig;
    messages.config = messagesConfig;

    // start bot
    console.log(messages._('serverStarting', {name: config.name}));
    let bot = new TelegramBot(config.token, config.options);

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
        console.log(messages._('serverStopping', {name: config.name}));
        process.exit(0);
    });

    return {
        bot: bot,
        messages: messages,
        addCommand: autoloader.addCommand
    };
};
