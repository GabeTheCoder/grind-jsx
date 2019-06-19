'use strict';

export default (name, props = {}, ...children) => {
    const e = document.createElement(name);

    Object.keys(props).forEach(key => element(key, e));
    children.forEach(child => e.appendChild(child));

    return e;
};

const nodes = [];

export const renderIn = (domNode, component, props = {}, options = {}) => {
    const node = component(props);

    domNode.appendChild(node);
    nodes.push(node);

    const id = 'node-' + renderedNodes.length - 1;
    const size = options.measure ? measure(node) : 0;

    return { id, size };
};

export const renderOut = (domNode, index) => {
    domNode.removeChild(renderedNodes[index]);
    nodes.splice(index, 1);
};

export const renderSwap = (domNode, a, b) => {
    const na = nodes[a];
    const nb = nodes[b];

    if (!na || !nb || na === nb) {
        // return result somehow 
        return;
    }

    domNode.insertBefore(na, nb);
    nodes.splice
};

// MARK: Utils

const element = (key, e) => {
    const value = props[key];

    const event = onEvent(key);
    const name = eventName(event);

    if (event) {
        e.addEventListener(name, value);
    } else {
        e.setAttribute(key, value);
    }
};

const measure = component => {
    // TODO: measure each component, however unrelated it may be
    return 0;
};

const onEvent = key => key.match(/^on([A-Z]\w+)$/);
const eventName = event => event[1].toLowerCase();