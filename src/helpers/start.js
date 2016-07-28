import initComponent from 'helpers/initComponent.js';
import { UTILS } from 'constants';

export default () => {
    const starting = new Date().getMilliseconds();

    console.log('App bootstrap started.');

    document.querySelectorAll(UTILS.COMPONENTS_QUERY).forEach(node => {
        const components = node.dataset.components;

        components.split(' ').forEach(type => {
            initComponent(node, type);
        });
    });

    console.log(`App bootstrap finished with ${new Date().getMilliseconds() - starting}ms.`);
};
