import $ from 'jquery';

export default (() => {
    const topics = {};

    /**
     * Creates/Updates topic
     * @param id {String} - Topic id
     * @returns {Object} - topic with pub/sub API
     */
    return id => {
        let callbacks;
        let topic = id && topics[id];

        if (!topic) {
            callbacks = new $.Callbacks('unique');

            topic = {
                publish: callbacks.fire,
                subscribe: callbacks.add,
                unsubscribe: callbacks.remove
            };

            if (id) {
                topics[id] = topic;
            }
        }

        return topic;
    };
})();
