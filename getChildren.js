export function getChildren(parent) {
    switch (parent.nodeName) {
        case 'IFRAME':
            return this.$0.contentWindow.document.body.childNodes;
        default:
            const publicChildren = parent.childNodes;
            const returnObj = [];
            if (parent.shadowRoot) {
                parent.shadowRoot.childNodes.forEach((node) => {
                    returnObj.push(node);
                });
            }
            parent.childNodes.forEach(node => {
                returnObj.push(node);
            });
            return returnObj;
    }
}
