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
        catch(e) {}

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
        catch(e) {}

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
    
        if (!cmd.cmd) {
            console.log('command object of \'' + name + '\' should have \'cmd\' property set');
        }

        if (!cmd.description) {
            console.log('command object of \'' + name + '\' should have \'description\' property set');
        }
        
        commands[name] = cmd;
        
        return commands;
    },

    /**
     * helper function to locate and load config files
     * @access private
     * @param {string} filesDir
     * @returns {void}
     */
    fileLocator: (filesDir) => {
        try {
            fs.readdirSync(filesDir).forEach(file => {
                if (path.extname(file) === '.js') {
                    let fileName = path.basename(file, '.js');
                    autoloader.addCommand(fileName, require(filesDir + '/' + fileName));
                }
            });
        }
        catch(e) {}
    }
};

module.exports = autoloader;