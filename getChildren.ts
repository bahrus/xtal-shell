export function getChildren(parent: HTMLElement){
    switch(parent.nodeName){
        case 'IFRAME':
            return <any>(this.$0 as HTMLIFrameElement).contentWindow.document.body.childNodes as HTMLElement[];
        default:
            const publicChildren = parent.childNodes;
            const returnObj: HTMLElement[] = [];
            if(parent.shadowRoot) {
                parent.shadowRoot.childNodes.forEach((node: HTMLElement) =>{
                    returnObj.push(node);
                });
            }
            parent.childNodes.forEach(node =>{
                returnObj.push(node as HTMLElement);
            })
            return returnObj;
    }        
}