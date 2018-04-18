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
            // let idx = 0;
            // let nonIndexedToken = token;
            // if(token === '..'){
            //     this.$0 = this.$0.parentElement;
            //     //if(typeof $0 !== 'undefined') $0 = this.currentEl;
            //     return this.$0;
            // }else if(token.endsWith(']')){
            //     const posOfOpen = token.indexOf('[');
            //     const indxString = token.substring(posOfOpen + 1, token.length - 1);
            //     idx = parseInt(indxString);
            //     nonIndexedToken = token.substring(0, posOfOpen);
            // }
            // //const children = this.$0.querySelectorAll(':scope > ' + nonIndexedToken);
            // const matchingNodes = [];
            // this.children.forEach((child : HTMLElement) =>{
            //     if(child.matches && child.matches(nonIndexedToken)){
            //         matchingNodes.push(child);
            //     }
            // })
            //this.$0 = matchingNodes[idx] as HTMLElement;
            this.$0 = this.getChildFromSinglePath(this.$0, token);
        });
        return this.$0;
    }
    static getChildFromSinglePath(el, token) {
        let idx = 0;
        let nonIndexedToken = token;
        if (token === '..') {
            // this.$0 = this.$0.parentElement;
            // return this.$0;
            return el.parentElement;
        }
        if (token.endsWith(']')) {
            const posOfOpen = token.indexOf('[');
            const indxString = token.substring(posOfOpen + 1, token.length - 1);
            idx = parseInt(indxString);
            nonIndexedToken = token.substring(0, posOfOpen);
        }
        //const children = this.$0.querySelectorAll(':scope > ' + nonIndexedToken);
        const matchingNodes = [];
        this.getChildren(el).forEach((child) => {
            if (child.matches && child.matches(nonIndexedToken)) {
                matchingNodes.push(child);
            }
        });
        return matchingNodes[idx];
    }
    static getChildren(parent) {
        switch (parent.nodeName) {
            case 'IFRAME':
                return this.$0.contentWindow.document.body.childNodes;
            default:
                if (parent.childNodes.length === 0 && parent.shadowRoot)
                    return parent.shadowRoot.childNodes;
                return parent.childNodes;
        }
    }
    static get children() {
        // switch(this.$0.nodeName){
        //     case 'IFRAME':
        //         return (this.$0 as HTMLIFrameElement).contentWindow.document.body.childNodes;
        //     default:
        //         if(this.$0.childNodes.length === 0 && this.$0.shadowRoot) return this.$0.shadowRoot.childNodes;
        //         return this.$0.childNodes;
        // }
        return this.getChildren(this.$0);
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
        const tagName = el.tagName.toLowerCase();
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
        const debugObj = {
            constructor: ce,
        };
        for (const key in props) {
            debugObj[key] = this.$0[key];
        }
        return debugObj;
    }
    static getPathFromParent(el) {
        const parent = el.parentElement;
        const list = this.getList(parent.childNodes);
        let path = '';
        list.forEach(token => {
            const testEl = this.getChildFromSinglePath(parent, token);
            if (testEl === el) {
                path = token;
            }
        });
        return path;
    }
    static getFullPath(el) {
        const reversePathArray = [];
        let ancestor = el;
        while (ancestor.tagName !== "HTML") {
            const path = this.getPathFromParent(ancestor);
            reversePathArray.push(path);
            ancestor = ancestor.parentElement;
        }
        reversePathArray.reverse();
        return reversePathArray.join('/');
    }
}
//# sourceMappingURL=$hell.js.map