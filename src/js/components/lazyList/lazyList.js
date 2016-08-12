// NOTE: This is a template Component1

// Define dependencies on top of the module
import $ from 'jquery';
import 'jquery-ui';
import Base from 'components/base/base.js';
import Factory from 'helpers/Factory.js';
import { throttle } from 'lodash';
import itemTemplate from './item.hbs';

// Then define Component's defaults
// Use uppercase for all keys and sub-keys
const DEFAULTS = {
    THROTTLE: 1000,
    SELECTORS: {
        // NOTE: Use only js-hooks to elements
        LIST: '.js-lazyLoadingList'
    },
    NAME_SPACE: '.lazy-list'
};

function toggleEventListeners(flag) {
    const action = flag ? 'on' : 'off';
    this.elements.$window[action](`scroll${this.options.NAME_SPACE}`, this.handleScroll.bind(this));
}

function fetch() {
    return $.ajax('data/products.json');
}

// NOTE: export need for tests
// WARN: Always extend Base component to provide shared API (see Base class)
export class LazyList extends Base {
    /**
     * Constructor
     * @param node {element} - root element for Component's scope
     */
    constructor(node) {
        super(node);
        this.lastScrollPosition = 0;
        const $root = $(node);
        const options = $root.data('options') || {};

        // NOTE: Port to provide extensions/options
        this.options = Object.assign({}, DEFAULTS, options.LazyList || {});

        // Define needed jQuery objects
        // NOTE: Be consistent and use the context (ex $root.find) to not outcome from the scope
        // Here might be exceptions as window or document
        // NOTE: You'll rarely need exact child jQuery objects
        this.elements = {
            $root,
            $list: $root.find(this.options.SELECTORS.LIST),
            $window: $(window),
            $document: $(window.document),
        };
        this.handleScroll = throttle(this.checkScrollPosition.bind(this), this.options.THROTTLE);
        this.attachEvents();
    }

    /**
     * Attaches event listeners
     */
    attachEvents() {
        toggleEventListeners.call(this, true);
    }

    getListElement() {
        return this.elements.$list;
    }

    getListContainer() {
        return this.elements.$root;
    }

    checkScrollPosition() {
        let lastChild;
        let offset;
        let top;
        const listEl = this.elements.$list;
        const $document = this.elements.$document;
        const pos = $document.scrollTop() + window.innerHeight;
        if (pos > this.lastScrollPosition) {
            lastChild = listEl.children().last();
            offset = lastChild.offset();
            top = offset && offset.top;
            if (pos > top) {
                this.addPage();
            }
        }
        this.lastScrollPosition = pos;
    }

    addPage() {
        const that = this;
        const htmlPartial = new DocumentFragment();
        toggleEventListeners.call(this, false);
        fetch().done((products) => {
            products.forEach((item) => {
                const li = document.createElement('li');
                li.innerHTML = itemTemplate(item);
                htmlPartial.appendChild(li);
            });
            that.elements.$list.append(htmlPartial);
            toggleEventListeners.call(this, true);
        });
    }

    /**
     * Removes listeners and all descriptions
     * @returns {Object} - jQuery $root object
     */
    destroy() {
        toggleEventListeners.call(this, false);
        super.destroy();
    }
}

export default Factory.registerComponent('LazyList', LazyList);
