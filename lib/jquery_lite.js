/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
    constructor(nodes) {
        this.nodes = nodes

    }

    html(html) {
        if (typeof html === "string") {
            this.nodes.forEach((node) => {
                node.innerHTML = html;
            })
        } else {
            return this.nodes[0].innerHTML;
        }
    }

    empty() {
        this.html('');
    }
    
    attr(key, val) {
        if (typeof val === "string") {
            this.nodes.forEach(node => node.setAttribute(key, val));
        } else {
            return this.nodes[0].getAttribute(key);
        }
    }

    addClass(className) {
        if (typeof className === "string") {
            this.nodes.forEach((node) => {
                node.classList.add(className)
            });
        }
    }

    removeClass(className) {
        if (typeof className === "string") {
            this.nodes.forEach((node) => {
                node.classList.remove(className)
            });
        }
    }

    children() {
        let children = []
        this.nodes.forEach((node) => {
            for (let i = 0; i < node.children.length; i++) {
                children.nodes.push(node.children[i])
            }
        });
        return new DOMNodeCollection(children)
    }

    parent() {
        let parents = []
        this.nodes.forEach((node) => {
            parents.push(node.parentNode);
        });
        return new DOMNodeCollection(parents);
    }
    
    remove() {
        this.nodes.forEach((node) => {
            node.parentNode.removeChild(node)
        })
    }

    on(eventName, cb) {
        this.nodes.forEach((node) => {
            node.addEventListener(eventName, cb)
            const eventKey = `jqliteEvents-${eventName}`
            if (typeof node[eventKey] === "undefined") {
                node[eventKey] = []
            }
            node[eventKey].push(cb)
        })
    }

    off(eventName) {
        this.nodes.forEach((node) => {
          const eventKey = `jqliteEvents-${eventName}`
          if (node[eventKey]) {
            node[eventKey].forEach((callback) => {
              node.removeEventListener(eventName, callback)
            });
          }
          node[eventKey] = []
        });
      }

    find(selector) {
        let nodes = document.querySelectorAll(selector)
        let results = []
        nodes.forEach((node) => {
            results.push(node);
        })
        return new DOMNodeCollection(results)
    }

    append(children) {
        if (this.nodes.length === 0) return;

        if (typeof children === 'object' && !(children instanceof DOMNodeCollection)) {
            children = $l(children);
        }

        if (typeof children === "string") {
            this.nodes.forEach((node) => {
                node.innerHTML += children;
            })
        } else if (children instanceof DOMNodeCollection) {
            this.nodes.forEach((node) => {
                children.nodes.forEach((childNode) => {
                    node.appendChild(childNode.cloneNode(true));
                })
            })
        }
    }

    extend(...args) {
        // merge objects and return 
    }

    ajax() {
        
    }
}

module.exports = DOMNodeCollection;

/***/ })
/******/ ]);
//# sourceMappingURL=jquery_lite.js.map