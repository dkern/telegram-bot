'use strict';

/**
 * merge two or more object in order
 * @param {object} target
 * @param {object} source...
 * @returns {object}
 */
let merge = (target, source) => {
    Array.from(arguments).forEach(obj => {
        if (!obj) {
            return;
        }

        Object.keys(obj).forEach(key => {
            if (typeof obj[key] === 'object') {
                target[key] = merge(target[key], obj[key]);
            }
            else {
                target[key] = obj[key];
            }
        });
    });

    return target;
};

module.exports = merge;