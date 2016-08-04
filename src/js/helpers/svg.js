/* eslint-disable no-underscore-dangle */
const __svg__ = {
    path: '../../icons/**/*.svg',
    name: './build/icons/icons.svg'
};

require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);
/* eslint-enable no-underscore-dangle */
