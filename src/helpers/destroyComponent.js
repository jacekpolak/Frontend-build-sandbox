import $ from 'jquery';

/**
 *
 * @param node {Element}
 * @param type {String}
 * @returns {Element}
 */
export default (node, type) => {
    const data = $.data(node);
    const component = data.components[type];

    component.destroy();

    delete data.components[type];

    $.data(node, data);

    return node;
};
