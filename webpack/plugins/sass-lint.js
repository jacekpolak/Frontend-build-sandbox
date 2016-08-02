'use strict';

const path = require('path');
const sassLintPlugin = require('sasslint-webpack-plugin');

module.exports = new sassLintPlugin({
    configFile: path.join(__dirname, './../sasslint/.scss-lint.yml'),
    ignorePlugins: ['extract-text-webpack-plugin']
});