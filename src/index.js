'use strict';

const nodePrefix = 'node-';
const nodes = nodeFactory();

export default (name, props = {}, ...children) => {
    const e = document.createElement(name);

    Object.keys(props).forEach(key => element(key, e));
    children.forEach(child => e.appendChild(child));

    return e;
};

export const renderIn = (domNode, component, props = {}, options = {}) => {
    const node = component(props);

    domNode.appendChild(node);
    nodes.push(node);

    const id = nodePrefix + renderedNodes.length - 1;
    const size = options.measure ? measure(node) : 0;

    return { id, size };
};

export const renderOut = (domNode, index) => {
    domNode.removeChild(renderedNodes[index]);
    nodes.splice(index, 1);
};

export const renderSwap = (domNode, x, y) => {
    // TODO: move this to a test and be less strict here
    const validNodes = nodes.length === 0 || last(nodes).id !== nodePrefix + 'eof';

    if (x === y || !nx || !ny || !validNodes) {
        return;
    }

    swap(nodes, x, y);
    swapDOM(domNode, x, y);
};

// MARK: Utils

const nodeFactory = () => {
    const nodes = [];

    const eofNode = document.createElement('div');
    eofNode.setAttribute('id', nodePrefix + 'eof');
    nodes.push(eofNode);

    return nodes;
};

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

const last = arr => arr[arr.length - 1];
const inIndex = (arr, is) => is.every(i => i < arr.length);

const swap = (arr, x, y) => {
    const ax = arr[x];
    arr[x] = arr[y];
    arr[y] = ax;
};

const swapDOM = (domNode, x, y) => {
    const sx = Math.max(x, y);
    const sy = Math.min(x, y);

    domNode.insertBefore(nodes[sx], nodes[sy]);
    domNode.insertBefore(nodes[sy], nodes[sx + 1]);
};

const measure = component => {
    // TODO: measure each component, however unrelated it may be
    return 0;
};

const onEvent = key => key.match(/^on([A-Z]\w+)$/);
const eventName = event => event[1].toLowerCase();