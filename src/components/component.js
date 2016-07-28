// NOTE: This is a template Component

// Define dependencies on top of the module
import $ from 'jquery';
import { throttle } from 'lodash';
import Factory from 'helpers/Factory.js';
import destroyComponent from 'helpers/destroyComponent.js';

// Then define Component's defaults
// Use uppercase for all keys and sub-keys
const DEFAULTS = {
    SELECTORS: {
        CHILD: '.js-child'
    },
    MODIFIERS: {
        // This should be related to CSS Style Guide: BEM modifier definition
        ACTIVE: 'component_state_active'
    },
    // Always define namespace for util usage (events ns etc)
    NAME_SPACE: 'component',
    THROTTLE: 200
};

class Component {
    /**
     * Constructor
     * @param node {element} - root element for Component's scope
     */
    constructor(node) {
        const $root = $(node);
        const options = $root.data('options') || {};

        // NOTE: Port to provide extensions/options
        this.options = Object.assign({}, DEFAULTS, options.Component || {});

        // Define needed jQuery objects
        // NOTE: Be consistent and use the context (ex $root.find) to not outcome from the scope
        // Here might be exceptions as window or document
        // NOTE: You'll rarely need exact child jQuery objects
        this.elements = {
            $root,
            $window: $(window),
            $child: $root.find(this.options.SELECTORS.CHILD)
        };

        // If we need some actions on initialization call it in constructor
        this.attachEvents();
    }

    /**
     * Attaches event listeners
     */
    attachEvents() {
        // NOTE: Use 'bind' to prevent context change
        // NOTE: Use 'on' API to delegate event handlers,
        // It's also helpful to remove listeners in one call on the $root jQuery object
        this.elements.$root.on(`click.${this.options.NAME_SPACE}`,
            this.options.SELECTORS.CHILD,
            this.handleClick.bind(this));

        // NOTE: Use throttle for events like 'scroll', 'resize'
        // NOTE: Use debounce for events like 'change', 'keyup'
        this.elements.$window.on(`scroll.${this.options.NAME_SPACE}`,
            throttle(this.handleScroll.bind(this), this.options.THROTTLE));
    }

    /**
     * Handles click event
     * @param event {Object}
     */
    handleClick(event) {
        event.preventDefault();

        console.log(this.elements.$child);

        this.elements.$child.toggleClass(this.options.MODIFIERS.ACTIVE);
    }

    /**
     * Handles scroll event
     * @param event {Object}
     */
    handleScroll(event) {
        console.log(event);
    }

    // NOTE: Always provide public destroy method - it's necessary for Components Factory
    /**
     * Removes listeners and all descriptions
     * @returns {Object} - jQuery $root object
     */
    destroy() {
        // Remove event listeners by namespace on each node
        Object.keys(this.elements).forEach($node => $node.off(this.options.NAME_SPACE));

        // NOTE: Use destroyComponent helper to delete Component's instance from memory
        destroyComponent(this.elements.$root.get(0), 'Component');
        return this.elements.$root;
    }
}

export default Factory.registerComponent('Component', Component);
