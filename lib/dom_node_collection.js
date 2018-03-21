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