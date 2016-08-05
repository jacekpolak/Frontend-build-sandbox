// NOTE: This is a template Component1

// Define dependencies on top of the module
import $ from 'jquery';
import 'jquery-ui';
import Base from 'components/base/base.js';
import Factory from 'helpers/Factory.js';

// Then define Component's defaults
// Use uppercase for all keys and sub-keys
const DEFAULTS = {
    SELECTORS: {
        // NOTE: Use only js-hooks to elements
        HIDE_LIST: '.footer-toggle-list',
        CHILD_LIST: 'ul'
    },
    MODIFIERS: {
        // This should be related to CSS Style Guide: BEM modifier definition
        ACTIVE: 'footer--is--hiden'
    },
    NAME_SPACE: '.footer'
};

// NOTE: export need for tests
// WARN: Always extend Base component to provide shared API (see Base class)
export class Footer extends Base {
    /**
     * Constructor
     * @param node {element} - root element for Component's scope
     */
    constructor(node) {
        super(node);

        const $root = $(node);
        const options = $root.data('options') || {};

        // NOTE: Port to provide extensions/options
        this.options = Object.assign({}, DEFAULTS, options.Footer || {});

        // Define needed jQuery objects
        // NOTE: Be consistent and use the context (ex $root.find) to not outcome from the scope
        // Here might be exceptions as window or document
        // NOTE: You'll rarely need exact child jQuery objects
        this.elements = {
            $root,
            $footerList: $root.find(this.options.SELECTORS.CHILD_LIST)
        };
        // If we need some actions on initialization call it in constructor
        this.hideList();
    }

    /**
     * Attaches event listeners
     */
    attachEvents() {

    }

    /**
     * Hide list element from footer
     */
    hideList() {
        this.elements.$root
            .on(`click${this.options.NAME_SPACE}`,
                this.options.SELECTORS.HIDE_LIST,
                this.toggleList.bind(this));
    }

    toggleList(event) {
        // event.preventDefault();
        const footer = this.elements.$root.find(event.currentTarget);
        const list = footer.find(this.options.SELECTORS.CHILD_LIST);
        list.toggleClass(this.options.MODIFIERS.HIDE_LIST);
        footer.toggleClass('footer-is-show');
    }

    /**
     * Removes listeners and all descriptions
     * @returns {Object} - jQuery $root object
     */
    destroy() {
        // Assume here could be plugins destroying & other util stuff
        this.elements.$datepicker.datepicker('destroy');

        // NOTE: If override destroy method
        // Call super.destroy at the and of method to remove listeners, modifiers etc.
        super.destroy();
    }
}

export default Factory.registerComponent('Footer', Footer);
