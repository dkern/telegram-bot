'use strict';

let config = require('./config/bot');
let messages = require('./config/messages');
let TelegramBotWrapper = require('./');

module.exports = new TelegramBotWrapper(config, messages);
