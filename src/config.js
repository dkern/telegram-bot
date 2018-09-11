'use strict';

let extend = require('extend');

/**
 * config representation
 * @param {*} bot
 * @param {*} defaultMessages
 * @param {*} customMessages
 * @constructor
 */
let Config = function(bot, defaultMessages, customMessages) {
    extend(this.bot, bot);
    extend(this.messages, defaultMessages, customMessages);
};

/**
 * bot configuration
 * @type {{name: string, token: string, useUserWhitelist: boolean, allowedUserWhitelist: Array, options: {polling: boolean}, storage: {directory: string, file: string}}}
 */
Config.prototype.bot = {
    /**
     * bot display name, should be the same as registered with @BotFather
     * @type {string}
     */
    name: '',

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
    allowedUserWhitelist: [],

    /**
     * bot options
     * @type {*}
     */
    options: {
        polling: true
    },

    /**
     * storage settings
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

/**
 * messages configuration
 * @type {{}}
 */
Config.prototype.messages = {};

module.exports = Config;
