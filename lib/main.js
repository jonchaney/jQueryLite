const DOMNodeCollection = require("./dom_node_collection");

document.addEventListener('DOMContentLoaded', () => {

    window.$l = (arg) => {
        if (arg instanceof HTMLElement) {
            return new DOMNodeCollection([arg]);
        } else {
            return new DOMNodeCollection(document.querySelectorAll(arg))
        }
    };

  });