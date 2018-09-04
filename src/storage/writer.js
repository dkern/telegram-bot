'use strict';

let fs = require('fs');

module.exports = {
    /**
     * writes username cache
     * @param {string|Array} usernames
     * @param {function} [callback]
     * @returns {void}
     */
    writeUsers: (usernames, callback) => {
        if (Array.isArray(usernames)) {
            usernames = JSON.stringify(usernames);
        }

        fs.writeFile(process.cwd() + '/tmp/usernames', usernames, err => {
            if (err) {
                return console.log(err);
            }

            callback && callback(err);
        });
    }
};