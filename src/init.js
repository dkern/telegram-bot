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
    let autoloader = require('./util/autoloader');
    let TelegramBot = require('node-telegram-bot-api');

    // start bot
    let bot = new TelegramBot(config.bot.token, config.bot.options);
    console.log(messages._('serverStarting', {name: config.bot.name}));

    // register bot on messages functions
    messages.bot = bot;

    messages.broadcast.sendMarkdown(bot, 'started');
    autoloader.registerCommands(bot);

    // on errors
    bot.on('polling_error', err => console.log(err));

    // process stop
    process.on('SIGINT', () => {
        messages.broadcast.sendMarkdown(bot, 'stopped');
        console.log(messages._('serverStopping', {name: config.bot.name}));
        setTimeout(() => process.exit(0), 200);
    });

    return {
        bot: (init.bot = bot),
        config: (init.config = config),
        messages: (init.messages = messages),
        autoloader: (init.autoloader = autoloader)
    };
};

module.exports = init;
