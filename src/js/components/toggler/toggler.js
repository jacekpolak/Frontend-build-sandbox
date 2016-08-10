import $ from 'jquery';
import { throttle } from 'lodash';
import { EVENTS } from 'constants';
import pubsub from 'helpers/pubsub.js';
import Base from 'components/base/base.js';
import Factory from 'helpers/Factory.js';

const DEFAULTS = {
    SELECTORS: {
        TRIGGER: '.js-trigger'
    },
    MODIFIERS: {
        ACTIVE: 'active'
    },
    EVENT: 'click',
    CLOSE_OUTSIDE: true,
    CLOSE_ON_OTHERS: true,
    NAME_SPACE: '.toggler',
    THROTTLE: 200
};

let NS_ID = 0;

export class Toggler extends Base {
    /**
     * Constructor
     * @param node {element} - root element for Component's scope
     */
    constructor(node) {
        super(node);

        const $root = $(node);
        const options = $root.data('options') || {};

        this.options = Object.assign({}, DEFAULTS, options.Toggler || {});

        this.elements = {
            $root,
            $document: $(document)
        };

        this.options.NAME_SPACE = this.options.NAME_SPACE + NS_ID;

        NS_ID++;

        this.attachEvents();
    }

    /**
     * Attaches event listeners
     */
    attachEvents() {
        this.elements.$root
            .on(`${this.options.EVENT}${this.options.NAME_SPACE}`,
            this.options.SELECTORS.TRIGGER,
            throttle(this.toggle.bind(this), this.options.THROTTLE))
            .on(`${this.options.EVENT}${this.options.NAME_SPACE}`, Toggler.stopPropagation);

        if (this.options.CLOSE_OUTSIDE) {
            this.elements.$document
                .on(`${this.options.EVENT}${this.options.NAME_SPACE}`,
                this.close.bind(this));
        }

        if (this.options.CLOSE_ON_OTHERS) {
            pubsub(EVENTS.TOGGLE).subscribe(this.close.bind(this));
        }
    }

    close(ns) {
        if (!ns || ns !== this.options.NAME_SPACE) {
            this.elements.$root.removeClass(this.options.MODIFIERS.ACTIVE);
        }
    }

    toggle(event) {
        event.preventDefault();
        event.stopPropagation();

        this.elements.$root.toggleClass(this.options.MODIFIERS.ACTIVE);
        pubsub(EVENTS.TOGGLE).publish(this.options.NAME_SPACE);
    }

    static stopPropagation(event) {
        event.stopPropagation();
    }
}

export default Factory.registerComponent('Toggler', Toggler);
