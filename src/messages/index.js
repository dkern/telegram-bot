'use strict';

let formatter = require('./formatter');

module.exports = {
    config: require('./../../config/messages'),
    _: formatter,
    formatter: formatter,
    sendHtml: require('./types/html'),
    sendMarkdown: require('./types/markdown'),
    sendText: require('./types/text')
};