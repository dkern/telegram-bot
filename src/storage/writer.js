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
        usernames = JSON.stringify(usernames);

        if (!fs.existsSync(process.cwd() + '/tmp')){
            fs.mkdirSync(process.cwd() + '/tmp');
        }

        fs.writeFile(process.cwd() + '/tmp/usernames', usernames, err => {
            if (err) {
                return console.log(err);
            }

            callback && callback(err);
        });
    }
};