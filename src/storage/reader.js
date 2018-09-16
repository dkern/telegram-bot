'use strict';

let fs = require('fs');

/**
 * storage reader
 * @param {string} directory
 * @param {string} file
 * @constructor
 */
let Reader = function(directory, file) {
    this.directory = directory;
    this.file = file;
};

/**
 * reads user names from file
 * @returns {object}
 */
Reader.prototype.readUsers = function() {
    try {
        let data = fs.readFileSync(process.cwd() + this.directory + '/' + this.file);
        return JSON.parse(data);
    }
    catch(e) {}

    return {};
};

module.exports = Reader;
