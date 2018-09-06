'use strict';

let config = require('./config/bot');
let messages = require('./config/messages');
let TelegramBot = require('./');

module.exports = new TelegramBot(config, messages);
