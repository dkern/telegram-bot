'use strict';

let fs = require('fs');

/**
 * storage reader
 * @param {string} dir
 * @param {string} file
 * @constructor
 */
let Reader = function(dir, file) {
    this.directory = dir;
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
