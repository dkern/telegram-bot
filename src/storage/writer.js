'use strict';

let fs = require('fs');

/**
 * storage writer
 * @param {string} directory
 * @param {string} file
 * @constructor
 */
let Writer = function(directory, file) {
    this.directory = directory;
    this.file = file;
};

/**
 * writes username cache
 * @param {string|Array} usernames
 * @param {function} [callback]
 * @returns {void}
 */
Writer.prototype.writeUsers = function(usernames, callback) {
        usernames = JSON.stringify(usernames);

        if (!fs.existsSync(process.cwd() + this.directory)){
            fs.mkdirSync(process.cwd() + this.directory);
        }

        fs.writeFile(process.cwd() + this.directory + '/' + this.file, usernames, err => {
            if (err) {
                return console.log(err);
            }

            callback && callback(err);
        });
};

module.exports = Writer;
