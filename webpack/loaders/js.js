'use strict';

module.exports = {
    test: /\.js?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel',
    query: {
        presets: [require.resolve('babel-preset-es2015')],
        plugins: [require.resolve('babel-plugin-transform-runtime')]
    }
};