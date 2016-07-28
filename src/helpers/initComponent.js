import $ from 'jquery';
import Factory from 'helpers/Factory.js';

/**
 *
 * @param node {Element}
 * @param type {String}
 * @returns {Element}
 */
export default (node, type) => {
    const data = $.data(node, 'components') || {};
    const Constructor = Factory.getComponent(type);

    if (!data[type]) {
        data[type] = new Constructor(node);

        $.data(node, 'components', data);
    } else {
        console.error(`Trying to initialize Component ${type.toUpperCase()} on element:`);
        console.error(node);
    }

    return node;
};
