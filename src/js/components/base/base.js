import $ from 'jquery';

export default class Base {
    getModifiers() {
        return Object.keys(this.options.MODIFIERS || {})
            .map(key => this.options.MODIFIERS[key])
            .join(' ');
    }

    destroy() {
        const modifiers = this.getModifiers();

        // NOTE: Async to next event-loop iteration, might be changed
        setTimeout(() => {
            Object.keys(this.elements).forEach(key => {
                this.elements[key].removeClass(modifiers).off(this.options.NAME_SPACE);
            });

            this.clearFromData();
        }, 0);
    }

    clearFromData() {
        const node = this.elements.$root.get(0);
        const data = $.data(node);

        // NOTE: Delete Component's instance from memory
        delete data.components[this.constructor.name];

        $.data(this.elements.$root.get(0), data);
    }
}
