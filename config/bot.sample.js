'use strict';

/**
 * config
 * @type {*}
 */
module.exports = {
    /**
     * bot display name, should be the same as registered with @BotFather
     * @type {string}
     */
    name: 'MyBot',

    /**
     * bot user name, must be the same as registered with @BotFather
     * @type {string}
     */
    username: 'my_bot',

    /**
     * bot token, as received from @BotFather
     * @type {string}
     */
    token: '',

    /**
     * enables username whitelist
     * @type {boolean}
     */
    useUserWhitelist: true,

    /**
     * username whitelist
     * @type {Array}
     */
    allowedUserWhitelist: [
        'usernames'
    ]
};