import $ from "../core";

const Store = (function () {
    let state = {};
    const listeners = {};

    const getState = (key) => (key ? state[key] : { ...state });

    const setState = (key, value) => {
        const prev = state[key];
        state[key] = value;

        if (listeners[key]) {
            listeners[key].forEach((cb) => cb(value, prev));
        }
    };

    const subscribe = (key, callback) => {
        if (!listeners[key]) listeners[key] = [];
        listeners[key].push(callback);

        return () => {
            listeners[key] = listeners[key].filter((cb) => cb !== callback);
        };
    };

    const reset = () => {
        state = {};
        for (let key in listeners) {
            listeners[key].forEach((cb) => cb(undefined));
        }
    };

    return {
        getState,
        setState,
        subscribe,
        reset,
    };
})();

window.Store = Store;

export default Store;
