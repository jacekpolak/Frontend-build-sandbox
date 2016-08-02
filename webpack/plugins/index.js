'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = [
    require('./chunks'),
    require('./define'),
    require('./extract-text'),
    require('./provide'),
    require('./svg'),
    require('./sass-lint')
];

if (NODE_ENV === 'production') {
    module.exports.push(require('./uglify'));
}