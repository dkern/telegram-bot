'use strict';

/**
 * default messages
 * values can be an string or an array of strings
 * a random entry will be picked if it's an array
 * @type {*}
 */
module.exports = {
    // server console messages
    serverStarting: '${name} is running ...',
    serverStopping: '${name} is shutting down ...',
    serverRegisterCmd: 'Command \'${cmd}\' registered ...',
    commandAlreadyRegistered: 'Command object of \'${name}\' already registered',
    commandMissingRegister: 'Command object of \'${name}\' needs a \'register\' function',
    commandCmdNotice: 'Command object of \'${name}\' should have \'cmd\' property set when \'showInHelp\' is enabled',
    commandDescriptionNotice: 'Command object of \'${name}\' should have \'description\' property set when \'showInHelp\' is enabled',

    // default messages
    started: '✅ Bot Service started.',
    stopped: '❌ Bot Service is shutting down.',

    // user authentication
    userAllowed: 'You are registered now. Feel free to talk with me now.',
    userUnregistered: 'You need to register yourself, to speak with me. Use /start command for this.',
    userRejected: [
        'I don\'t have an permission to speak with you.',
        'Permission denied.',
        'I didn\'t know you, so I wouldn\'t respond to your requests.'
    ],

    // command responses
    start: 'Hello ${user}! I\'m *${name}*, your personal Telegram bot.',
    help: '*Do you need help?*\n\nUse the following commands to interact with me:',
    unregistered: 'Confirmed. You are unregistered now.️',
    uptime: 'My service was started *${date}* at *${time}* o\'clock, meaning I\'m up for *${uptime}*.',
    whoamiRegistered: 'You\'re *${name}* and I know you since *${date}* at *${time}* o\'clock.',
    whoamiUnregistered: 'You\'re *${name}*, but I doesn\'t know anymore about you. I think you are not registered by now. Use /start command to register yourself.',

    // command help
    cmdHelp: 'prints this help',
    cmdStart: 'start interactions',
    cmdSayHello: 'welcome message',
    cmdUnregister: 'disconnect from me',
    cmdUptime: 'bot uptime info',
    cmdWhoAmI: 'information about you'
};