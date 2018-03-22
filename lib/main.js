const DOMNodeCollection = require("./dom_node_collection");

const _docReadyCallbacks = [];
let _docReady = false;


window.$l = (arg) => {
    if (arg instanceof HTMLElement) {
        return new DOMNodeCollection([arg]);
    } else if (typeof arg === "function") {
        registerDocReadyCallback(arg)
    } else {
        return new DOMNodeCollection(document.querySelectorAll(arg))
    }
};


registerDocReadyCallback = (func) => {
    if (!_docReady) {
        _docReadyCallbacks.push(func);
    } else {
        func();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    _docReady = true;
    _docReadyCallbacks.forEach(func => func());
});
