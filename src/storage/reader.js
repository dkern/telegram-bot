'use strict';

let fs = require('fs');

module.exports = {
    /**
     * reads user names from file
     * @returns {object}
     */
    readUsers: () => {
        try {
            let data = fs.readFileSync(process.cwd() + '/tmp/usernames');
            return JSON.parse(data);
        }
        catch(e) {}

        return {};
    }
};