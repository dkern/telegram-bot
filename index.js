'use strict';

let config = require('./config/bot');
let messages = require('./config/messages');

require('./bot')(config, messages);
