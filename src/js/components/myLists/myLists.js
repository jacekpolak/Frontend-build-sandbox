// NOTE: This is a template MyLists

// Define dependencies on top of the module
import $ from 'jquery';
import Base from 'components/base/base.js';
import Factory from 'helpers/Factory.js';

// Then define Component's defaults
// Use uppercase for all keys and sub-keys
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

// NOTE: export need for tests
// WARN: Always extend Base component to provide shared API (see Base class)
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

        // this.attachEvents();
    }

    /**
     * Attaches event listeners
     */
    attachEvents() {
        this.elements.$root
            .on(`click${this.options.NAME_SPACE}`,
            this.options.SELECTORS.CREATE,
            this.showForm.bind(this))
            .on(`submit${this.options.NAME_SPACE}`,
            this.options.SELECTORS.FORM,
            this.handleSubmit.bind(this));
    }

    showForm(event) {
        event.preventDefault();

        this.elements.$root.addClass(this.options.MODIFIERS.EDITABLE);
    }

    hideForm() {
        this.elements.$root.removeClass(this.options.MODIFIERS.EDITABLE);
    }

    handleSubmit(event) {
        event.preventDefault();

        // $.ajax({
        //    url: this.options.SERVICE,
        //    method: 'POST',
        //    success: data => {
        //        event.target.reset();
        //        this.hideForm();
        //    },
        //    complete: () => {
        //
        //    }
        // });

        event.target.reset();
        this.hideForm();
    }

    /**
     * Removes listeners and all descriptions
     * @returns {Object} - jQuery $root object
     */
    destroy() {
        super.destroy();
    }
}

export default Factory.registerComponent('MyLists', MyLists);
