'use strict';

let fs = require('fs');

module.exports = {
    /**
     * reads user names from file
     * @returns {object}
     */
    readUsers: () => {
        try {
            fs.readFileSync(process.cwd() + '/tmp/usernames', (err, data) => {
                if (err) {
                    console.log(err);
                    return {};
                }

                return JSON.parse(data);
            });
        }
        catch(e) {}

        return {};
    }
};