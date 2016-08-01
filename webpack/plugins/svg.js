'use strict';

const SvgStore = require('webpack-svgstore-plugin');

module.exports = new SvgStore({
    // svgo options
    svgoOptions: {
        plugins: [
            {
                removeTitle: true
            }
        ]
    }
});