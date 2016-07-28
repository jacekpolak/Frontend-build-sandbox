'use strict';

module.exports = {
    test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file?name=assets/[name].[ext]'
};