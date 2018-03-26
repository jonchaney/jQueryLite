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
}

module.exports = DOMNodeCollection;