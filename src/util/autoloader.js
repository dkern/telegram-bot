'use strict';

let path = require('path');
let fs = require('fs');
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
    commands: () => {
        if (commands.length) {
            return commands;
        }

        // check for default commands
        try {
            let dir = require.resolve('telegram-bot/commands');
            autoloader.fileLocator(dir, commands);
        }
        catch(e) {}

        // check for local commands directory
        try {
            let dir = process.cwd() + '/commands';

            if (!fs.lstatSync(dir).isDirectory()) {
                //noinspection ExceptionCaughtLocallyJS
                throw new Error();
            }

            autoloader.fileLocator(dir, commands);
        }
        catch(e) {}

        return commands;
    },

    /**
     * add a command manually to bot instance
     * @param {string} name
     * @param {object} cmd
     * @returns {void}
     */
    addCommand: (name, cmd) => {
        if (!cmd.register) {
            throw new Error('an command object needs a \'register\' function');
        }
    
        if (!cmd.cmd) {
            console.log('your command object should have \'cmd\' property set');
        }

        if (!cmd.description) {
            console.log('your command object should have \'description\' property set');
        }
        
        commands[name] = cmd;
    },

    /**
     * helper function to locate and load config files
     * @access private
     * @param {string} filesDir
     * @param {object} object
     * @returns {boolean|object}
     */
    fileLocator: (filesDir, object) => {
        try {
            let loaded = object || {};

            fs.readdirSync(filesDir).forEach(file => {
                if (path.extname(file) === '.js') {
                    let fileName = path.basename(file, '.js');
                    loaded[fileName] = require(filesDir + '/' + fileName);
                }
            });

            return loaded;
        }
        catch(e) {}

        return false;
    }
};

module.exports = autoloader;