'use strict';

let config = require('./config/bot');
let messages = require('./config/messages');
let TelegramBotWrapper = require('./');

let instance = new TelegramBotWrapper(config, messages);
instance.start();

module.exports = instance;
