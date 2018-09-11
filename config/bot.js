'use strict';

/**
 * default bot configuration
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
     * @see https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#new-telegrambottoken-options
     * @type {*}
     */
    options: {
        polling: true
    },

    /**
     * user storage settings
     * @type {*}
     */
    storage: {
        /**
         * storage directory, relative from process.cwd()
         * @type {string}
         */
        directory: '/temp',

        /**
         * storage file
         * @type {string}
         */
        file: 'registered.json',
    }
};