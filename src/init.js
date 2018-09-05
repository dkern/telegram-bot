'use strict';

/**
 * start telegram bot with given configuration
 * @param {object} botConfig
 * @param {object} messagesConfig
 * @returns {object}
 */
let init = (botConfig, messagesConfig) => {
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
    autoloader.registerCommands(bot);
    bot.on('polling_error', err => console.log(err));

    // process stop
    process.on('SIGINT', () => {
        console.log(messages._('serverStopping', {name: config.bot.name}));
        process.exit(0);
    });

    return {
        bot: (init.bot = bot),
        config: (init.config = config),
        messages: (init.messages = messages),
        autoloader: (init.autoloader = autoloader)
    };
};

module.exports = init;
