'use strict';

export default (name, props, ...children) => {
    const e = document.createElement(name);
    const objProps = props || {};

    Object.keys(objProps).forEach(key => element(objProps, key, e));
    children.forEach(child => append(e, child));

    return e;
};

export const renderIn = (domNode, component, props = {}, options = {}) => {
    const node = component(props);
    const nodeId = domNode.id;

    if (!nodes[nodeId]) {
        nodes[nodeId] = nodeFactory();
    }

    nodes[nodeId].push(append(domNode, node));

    const id = nodePrefix + nodes[nodeId].length - 1;
    const size = options.measure ? measure(node) : 0;

    return { id, size };
};

export const renderOut = (domNode, index) => {
    domNode.removeChild(nodes[index]);
    nodes.splice(index, 1);
};

export const clearAll = domNode => {
    if (!nodes[domNode.id]) return;

    nodes[domNode.id]
        .filter(node => node.id !== 'node-eof')
        .forEach(node => {
            try {
                domNode.removeChild(node);
            } catch (e) {
                // DOM issue
            }
        });

    nodes[domNode.id] = nodeFactory();
};

export const renderSwap = (domNode, x, y) => {
    // TODO: move this to a test and be less strict here, also support the hashmap nodes.
    const validNodes = nodes.length === 0 || last(nodes).id !== nodePrefix + 'eof';

    if (x === y || !nx || !ny || !validNodes) {
        return;
    }

    swap(nodes, x, y);
    swapDOM(domNode, x, y);
};

const nodeFactory = () => {
    const nodes = [];

    const eofNode = document.createElement('div');
    eofNode.setAttribute('id', nodePrefix + 'eof');
    nodes.push(eofNode);

    return nodes;
};

const fragmentFactory = () => {
    const fragment = document.createDocumentFragment();

    // this might actually give us best results on modern browsers. we can buffer all elements 
    // into this in a background thread possibly and then just append one element of say 10 items
    // within this fragment to the DOM.
};

const nodePrefix = 'node-';
const nodes = {};

// MARK: DOM Functions

const domDefines = {
    className: 'class'  
};

const element = (props, key, e) => {
    const value = props[key];
    const event = onEvent(key);

    if (event) {
        e.addEventListener(eventName(event), value);
    } else {
        const domKey = domDefines[key] || key;
        e.setAttribute(domKey, value);
    }
};

const append = (parent, child) => {
    if (!child) return;

    if (child instanceof HTMLElement || child instanceof SVGElement) {
        parent.appendChild(child);
    } else if (child instanceof Array) {
        child.forEach(nextChild => append(parent, nextChild));
    } else {
        const text = document.createTextNode(child);
        parent.appendChild(text);
    }

    return child;
};

// MARK: Utils

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

const measure = component => component.offsetHeight;

const onEvent = key => key.match(/^on([A-Z]\w+)$/);
const eventName = event => event[1].toLowerCase();