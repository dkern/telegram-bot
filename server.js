'use strict';

let config = require('./config/bot');
let messages = require('./config/messages');

require('./src/bot')(config, messages);
