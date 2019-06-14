'use strict';

export default (name, props = {}, ...children) => {
    const e = document.createElement(name);

    Object.keys(props).forEach(key => {
        const value = props[key];
        const event = onEvent(key);

        if (event) {
            e.addEventListener(eventName(event), value);
        } else {
            e.setAttribute(key, value);
        }
    });

    children.forEach(child => e.appendChild(child));

    return e;
};

export const renderIn = (domNode, component, props = {}) => {
    domNode.appendChild(component(props));
};

// MARK: Utils

const onEvent = key => key.match(/^on([A-Z]\w+)$/);
const eventName = event => event[1].toLowerCase();