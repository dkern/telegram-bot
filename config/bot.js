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
     * bot token, as received from @BotFather
     * @type {string}
     */
    token: '',

    /**
     * enables username whitelist
     * @type {boolean}
     */
    useUserWhitelist: false,

    /**
     * username whitelist
     * @type {Array}
     */
    allowedUserWhitelist: [
        'usernames'
    ],

    /**
     * bot options
     * @type {*}
     */
    options: {
        polling: true
    }
};