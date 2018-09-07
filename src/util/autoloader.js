'use strict';

let fs = require('fs');
let path = require('path');

/**
 * commands autoloader
 * @param {TelegramBotWrapper} instance
 * @constructor
 */
let Autoloader = function(instance) {
    this.commands = {};

    this.instance = instance;
    this.bot = instance.bot;
    this.messages = instance.messages;
};

/**
 * get all loaded commands (not registered!)
 * @returns {object}
 */
Autoloader.prototype.getLoadedCommands = function() {
    return this.commands;
};

/**
 * get all loaded commands (not registered!)
 * @returns {object}
 */
Autoloader.prototype.getRegisteredCommands = function() {
    let registered = {};

    Object.keys(this.commands).forEach(name => {
        if (this.commands[name].registered) {
            registered[name] = this.commands[name]; 
        }
    });

    return registered;
};

/**
 * add a directory of commands
 * @param {string} directory
 * @param {boolean} [noError]
 * @return {object}
 */
Autoloader.prototype.addCommandsDir = function(directory, noError) {
    try {
        if (fs.lstatSync(directory).isDirectory()) {
            this.fileLocator(directory);
        }
    }
    catch(e) {
        if (!noError) {
            console.log(e);
        }
    }

    return this.commands;
};

/**
 * add a command manually to bot instance
 * @param {string} name
 * @param {object} command
 * @returns {boolean}
 */
Autoloader.prototype.addCommand = function(name, command) {
    if (command.registered) {
        console.log(this.messages._('commandAlreadyRegistered', {name: name}));
        return false;
    }

    if (!command.register) {
        console.log(this.messages._('commandMissingRegister', {name: name}));
        return false;
    }

    if (command.showInHelp) {
        if (!command.cmd) {
            console.log(this.messages._('commandCmdNotice', {name: name}));
        }

        if (!command.description) {
            console.log(this.messages._('commandDescriptionNotice', {name: name}));
        }
    }

    this.commands[name] = command;
    return true;
};

/**
 * register commands on bot instance
 * @returns {void}
 */
Autoloader.prototype.registerCommands = function() {
    Object.keys(this.commands).forEach(name => {
        let command = this.commands[name];

        if (!command.registered) {
            command.register(this.instance);
            command.registered = true;

            console.log(this.messages._('serverRegisterCmd', {cmd: name}));
        }
    });
};

/**
 * helper function to load all files in an directory
 * @access private
 * @param {string} directory
 * @returns {void}
 */
Autoloader.prototype.fileLocator = function(directory) {
    let loaded = {};

    fs.readdirSync(directory).forEach(file => {
        if (path.extname(file) === '.js') {
            let fileName = path.basename(file, '.js');
            let command = require(directory + '/' + fileName);

            if (this.addCommand(fileName, command)) {
                loaded[name] = command;
            }
        }
    });

    return loaded;
};

module.exports = Autoloader;
