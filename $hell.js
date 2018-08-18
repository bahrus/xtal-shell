import { getChildren } from './getChildren.js';
import { getChildFromSinglePath } from './getChildFromSinglePath.js';
import { cd } from './cd.js';
import { dashToCamelCase } from './dashToCamelCase.js';
class $hell {
    static get pwd() {
        return this.pathHistory.join('/');
    }
    static initialize() {
        this.$0 = document.body;
        this.pathHistory = [''];
    }
    static cd(path) {
        if (!this.$0 || path.startsWith('/')) {
            this.initialize();
        }
        this.$0 = cd(this.$0, path, this.pathHistory);
        return this.$0;
    }
    static get children() {
        // switch(this.$0.nodeName){
        //     case 'IFRAME':
        //         return (this.$0 as HTMLIFrameElement).contentWindow.document.body.childNodes;
        //     default:
        //         if(this.$0.childNodes.length === 0 && this.$0.shadowRoot) return this.$0.shadowRoot.childNodes;
        //         return this.$0.childNodes;
        // }
        return getChildren(this.$0);
    }
    static getList(children) {
        const result = [];
        const matchingNodeNames = {};
        children.forEach((node) => {
            if (!node.matches)
                return;
            const nodeName = node.nodeName.toLowerCase();
            if (node.id) {
                result.push(nodeName + '#' + node.id);
                //return;
            }
            if (!matchingNodeNames[nodeName]) {
                matchingNodeNames[nodeName] = [];
            }
            matchingNodeNames[nodeName].push(node);
        });
        for (const key in matchingNodeNames) {
            const matchingNodes = matchingNodeNames[key];
            if (matchingNodes.length === 1) {
                const matchingNode = matchingNodes[0];
                if (!matchingNode.id) {
                    result.push(key);
                    continue;
                }
            }
            const test = matchingNodes.filter(node => !node.id);
            if (test.length === 0)
                continue;
            for (let i = 0, ii = matchingNodes.length; i < ii; i++) {
                const matchingNode = matchingNodes[i];
                if (matchingNode.id)
                    continue;
                result.push(key + '[' + i + ']');
            }
        }
        return result;
    }
    static get ls() {
        if (!this.$0) {
            this.initialize();
        }
        return this.getList(this.children);
    }
    static get properties() {
        return this.getProperties(this.$0);
    }
    static getProperties(el) {
        this.$0 = el;
        const tagName = el.tagName.toLowerCase();
        const ce = customElements.get(tagName);
        if (!ce) {
            console.log('props only provides information for custom elements.');
            return;
        }
        //if(!propertiesAlias) propertiesAlias = 'properties';
        const props = ce['properties'] || {};
        const observedAttributes = ce['observedAttributes'];
        if (observedAttributes) {
            observedAttributes.forEach(attrib => {
                const camelCase = dashToCamelCase(attrib);
                props[camelCase] = true;
            });
        }
        Object.getOwnPropertyNames(el).map(name => name.replace('_', '')).forEach(name => {
            props[name] = true;
        });
        if (!props) {
            console.log('No properties found');
        }
        const debugObj = {
            constructor: ce,
        };
        for (const key in props) {
            const underScore = '_' + key;
            if (!this.$0[key] && this.$0[underScore]) {
                debugObj[underScore] = this.$0[underScore];
            }
            else {
                debugObj[key] = this.$0[key];
            }
        }
        return debugObj;
    }
    static getParent(el) {
        const parent = el.parentNode;
        if (parent.nodeType === 11) {
            return parent['host'];
        }
        return parent;
    }
    static getPathFromParent(el) {
        const parent = this.getParent(el);
        const list = this.getList(getChildren(parent));
        let path = '';
        list.forEach(token => {
            const testEl = getChildFromSinglePath(parent, token);
            if (testEl === el) {
                path = token;
            }
        });
        return path;
    }
    static getFullPath(el) {
        const reversePathArray = [];
        let ancestor = el;
        while (ancestor.tagName !== "BODY") {
            const path = this.getPathFromParent(ancestor);
            reversePathArray.push(path);
            ancestor = this.getParent(ancestor);
            if (ancestor.tagName === 'BODY') {
                const fe = ancestor.ownerDocument.defaultView.frameElement;
                if (fe) {
                    ancestor = fe;
                }
            }
        }
        reversePathArray.reverse();
        return '/' + reversePathArray.join('/');
    }
}
$hell.pathHistory = [];
window['$hell'] = $hell;
//# sourceMappingURL=$hell.js.map