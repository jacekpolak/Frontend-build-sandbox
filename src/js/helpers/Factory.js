export default (() => {
    const Components = {};

    /**
     * Registers Constructor to Factory
     * @param type {String} - Component id
     * @param Component {class} - constructor
     */
    function registerComponent(type, Component) {
        const proto = Component.prototype;

        if (!proto.destroy) {
            throw new Error(`'destroy' method wasn't provide for a Component ${Component.name}`);
        }

        if (!Components[type]) {
            Components[type] = Component;
        } else {
            console.warn(`Trying to register Component ${type} twice.`);
        }
    }

    /**
     * Deletes Component from Factory
     * @param type {String}
     */
    function unregisterComponent(type) {
        delete Components[type];
    }

    /**
     * Returns Component constructor if exists
     * @param type {String}
     * @returns {class}
     */
    function getComponent(type) {
        if (!Components[type]) {
            throw new Error(`Trying to get unregistered Component ${type}`);
        }

        return Components[type];
    }

    return {
        registerComponent,
        unregisterComponent,
        getComponent
    };
})();
