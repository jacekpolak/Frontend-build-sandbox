import $ from 'jquery';
import Base from 'components/base/base.js';
import Factory from 'helpers/Factory.js';

const DEFAULTS = {
    SELECTORS: {
        CREATE: '.js-create',
        FORM: '.js-form'
    },
    MODIFIERS: {
        EDITABLE: 'my-lists--editable'
    },
    NAME_SPACE: '.myLists'
};

export class MyLists extends Base {
    /**
     * Constructor
     * @param node {element} - root element for Component's scope
     */
    constructor(node) {
        super(node);

        const $root = $(node);
        const options = $root.data('options') || {};

        this.options = Object.assign({}, DEFAULTS, options.MyLists || {});

        this.elements = {
            $root
        };
    }
}

export default Factory.registerComponent('MyLists', MyLists);
