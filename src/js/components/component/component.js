// NOTE: This is a template Component

// Define dependencies on top of the module
import $ from 'jquery';
import { throttle } from 'lodash';
import { EVENTS } from 'constants';
import Base from 'components/base/base.js';
import Factory from 'helpers/Factory.js';
import pubsub from 'helpers/pubsub.js';
import template from './component.hbs';

// Then define Component's defaults
// Use uppercase for all keys and sub-keys
const DEFAULTS = {
    SELECTORS: {
        // NOTE: Use only js-hooks to elements
        CHILD: '.js-child',
        SHOW_LIST: '.js-show-list',
        LIST: '.js-list-portal'
    },
    MODIFIERS: {
        // This should be related to CSS Style Guide: BEM modifier definition
        ACTIVE: 'component_state_active'
    },
    // Always define namespace for util usage (events ns etc)
    NAME_SPACE: '.component',
    THROTTLE: 200
};

// NOTE: export need for tests
// WARN: Always extend Base component to provide shared API (see Base class)
export class Component extends Base {
    /**
     * Constructor
     * @param node {element} - root element for Component's scope
     */
    constructor(node) {
        super(node);

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
            $child: $root.find(this.options.SELECTORS.CHILD),
            $list: $root.find(this.options.SELECTORS.LIST),
            $datepicker: $root.find(this.options.SELECTORS.DATEPICKER)
        };

        this.initPlugins();
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
        this.elements.$root
            .on(`click${this.options.NAME_SPACE}`,
                this.options.SELECTORS.CHILD,
                this.handleClick.bind(this))
            .on(`click${this.options.NAME_SPACE}`,
                this.options.SELECTORS.SHOW_LIST,
                this.render.bind(this));

        // NOTE: Use throttle for events like 'scroll', 'resize'
        // NOTE: Use debounce for events like 'change', 'keyup'
        this.elements.$window.on(`scroll.${this.options.NAME_SPACE}`,
            throttle(this.handleScroll.bind(this), this.options.THROTTLE));

        // NOTE: Example of pubsub usage
        pubsub(EVENTS.LOGIN).subscribe(this.onApiReturn.bind(this));
    }

    initPlugins() {
        this.elements.$datepicker.datepicker();
    }

    onApiReturn(data) {
        console.log(data);
    }
    /**
     * Handles click event
     * @param event {Object}
     */
    handleClick(event) {
        event.preventDefault();

        this.destroy();
        this.elements.$child.toggleClass(this.options.MODIFIERS.ACTIVE);
    }

    /**
     * Handles scroll event
     * @param event {Object}
     */
    handleScroll(event) {
        console.log(event);
    }

    render() {
        // NOTE: Mock data
        const html = template({
            entries: [
                {
                    value: 'Item 1'
                },
                {
                    value: 'Item 2'
                },
                {
                    value: 'Item 3'
                }
            ]
        });

        this.elements.$list.html(html);
    }

    /**
     * Removes listeners and all descriptions
     * @returns {Object} - jQuery $root object
     */
    destroy() {
        // Assume here could be plugins destroying & other util stuff

        // NOTE: If override destroy method
        // Call super.destroy at the and of method to remove listeners, modifiers etc.
        super.destroy();
    }
}

export default Factory.registerComponent('Component', Component);
