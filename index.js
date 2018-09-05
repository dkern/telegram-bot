'use strict';

let config = require('./config/bot');
let messages = require('./config/messages');

module.exports = require('./bot')(config, messages);
