import $ from 'jquery';

/**
 *
 * @param node {Element}
 * @param type {String}
 * @returns {Element}
 */
export default (node, type) => {
    const data = $.data(node);

    delete data.components[type];

    $.data(node, data);

    return node;
};
