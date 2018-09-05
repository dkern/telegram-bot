'use strict';

let fs = require('fs');
let path = require('path');
let messages = require('../messages');
let security = require('./security');

let commands = {};

/**
 * autoloader functions
 * @type {object}
 */
let autoloader = {
    /**
     * allocates all command files
     * @returns {object}
     */
    getCommands: () => {
        if (commands.length) {
            return commands;
        }

        // check for default commands
        try {
            let dir = require.resolve('telegram-bot');
            autoloader.addCommandsDir(path.dirname(dir) + '/commands');
        }
        catch(e) {}

        // check for local commands directory
        try {
            let dir = process.cwd() + '/commands';

            if (!fs.lstatSync(dir).isDirectory()) {
                //noinspection ExceptionCaughtLocallyJS
                throw new Error();
            }

            autoloader.addCommandsDir(dir);
        }
        catch(e) {
            console.log(e);
        }

        return commands;
    },

    /**
     * add a directory of commands
     * @param {string} dir
     * @return {object}
     */
    addCommandsDir: dir => {
        try {
            if (!fs.lstatSync(dir).isDirectory()) {
                //noinspection ExceptionCaughtLocallyJS
                throw new Error();
            }

            autoloader.fileLocator(dir);
        }
        catch(e) {
            console.log(e);
        }

        return commands;
    },

    /**
     * add a command manually to bot instance
     * @param {string} name
     * @param {object} cmd
     * @returns {object}
     */
    addCommand: (name, cmd) => {
        if (!cmd.register) {
            throw new Error('command object of \'' + name + '\' needs a \'register\' function');
        }

        if(cmd.showInHelp) {
            if (!cmd.cmd) {
                console.log('command object of \'' + name + '\' should have \'cmd\' property set');
            }

            if (!cmd.description) {
                console.log('command object of \'' + name + '\' should have \'description\' property set');
            }
        }

        commands[name] = cmd;

        return commands;
    },

    /**
     * register commands on bot instance
     * @param {TelegramBot} bot
     * @returns {void}
     */
    registerCommands: (bot) => {
        Object.keys(autoloader.getCommands()).forEach(name => {
            commands[name].register(bot, messages, security);
            console.log(messages._('serverRegisterCmd', {cmd: name}));
        });
    },

    /**
     * helper function to load all files in an directory
     * @access private
     * @param {string} filesDir
     * @returns {void}
     */
    fileLocator: (filesDir) => {
        fs.readdirSync(filesDir).forEach(file => {
            if (path.extname(file) === '.js') {
                let fileName = path.basename(file, '.js');
                autoloader.addCommand(fileName, require(filesDir + '/' + fileName));
            }
        });
    }
};

module.exports = autoloader;