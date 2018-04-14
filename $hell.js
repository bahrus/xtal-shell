//declare var $0
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
        const splitPath = path.split('/');
        splitPath.forEach(token => {
            if (!token)
                return;
            this.pathHistory.push(token);
            let idx = 0;
            let nonIndexedToken = token;
            if (token === '..') {
                this.$0 = this.$0.parentElement;
                //if(typeof $0 !== 'undefined') $0 = this.currentEl;
                return this.$0;
            }
            else if (token.endsWith(']')) {
                const posOfOpen = token.indexOf('[');
                const indxString = token.substring(posOfOpen + 1, token.length - 1);
                idx = parseInt(indxString);
                nonIndexedToken = token.substring(0, posOfOpen);
            }
            //const children = this.$0.querySelectorAll(':scope > ' + nonIndexedToken);
            // this.$0.childNodes
            const matchingNodes = [];
            this.$0.childNodes.forEach((child) => {
                if (child.matches && child.matches(nonIndexedToken)) {
                    matchingNodes.push(child);
                }
            });
            this.$0 = matchingNodes[idx];
        });
        return this.$0;
    }
    // static getContext(){
    //     let context : HTMLElement | ShadowRoot = this.$0;
    //     if(context.shadowRoot) context = context.shadowRoot;
    //     return context;
    // }
    static get ls() {
        if (!this.$0) {
            this.initialize();
        }
        const result = [];
        const matchingNodeNames = {};
        this.$0.childNodes.forEach((node) => {
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
    static get properties() {
        const tagName = this.$0.tagName.toLowerCase();
        const ce = customElements.get(tagName);
        if (!ce) {
            console.log('props only provides information for custom elements.');
            return;
        }
        //if(!propertiesAlias) propertiesAlias = 'properties';
        const props = ce['properties'];
        if (!props) {
            console.log('No properties found');
        }
        const debugObj = {};
        for (const key in props) {
            debugObj[key] = this.$0[key];
        }
        return debugObj;
    }
}
//# sourceMappingURL=$hell.js.map