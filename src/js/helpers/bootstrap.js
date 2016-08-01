import $ from 'jquery';
import Factory from 'helpers/Factory.js';
import { UTILS } from 'constants';

/**
 * Initializes Components
 * @param root {Object} - root element
 */
export default (root = document) => {
    const starting = new Date().getMilliseconds();

    console.log('App bootstrap started.');

    // NOTE: IE11 doesn't support 'forEach' for a NodeList
    // WARN: Hacky stuff here, might be replaced by regular loop because of performance reasons
    Array.prototype.forEach.call(root.querySelectorAll(UTILS.COMPONENTS_QUERY), node => {
        const components = node.dataset.components;

        components.split(' ').forEach(type => {
            const data = $.data(node, 'components') || {};
            const Constructor = Factory.getComponent(type);

            if (!data[type]) {
                data[type] = new Constructor(node);

                $.data(node, 'components', data);
            } else {
                console.error(`Trying to initialize Component ${type.toUpperCase()} on element:`);
                console.error(node);
            }
        });
    });

    console.log(`App bootstrap finished with ${new Date().getMilliseconds() - starting}ms.`);
};
