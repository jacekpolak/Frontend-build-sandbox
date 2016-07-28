export default class Base {
    destroy() {
        const modifiers = Object.keys(this.options.MODIFIERS || {})
            .map(key => this.options.MODIFIERS[key])
            .join(' ');

        // NOTE: Async to next event-loop iteration, might be changed
        setTimeout(() => {
            Object.keys(this.elements).forEach(key => {
                this.elements[key].removeClass(modifiers).off(this.options.NAME_SPACE);
            });
        }, 0);
    }
}
