import { getChildren } from './getChildren.js';
export function getChildFromSinglePath(el, token) {
    let idx = 0;
    let nonIndexedToken = token;
    if (token === '..') {
        // this.$0 = this.$0.parentElement;
        // return this.$0;
        return el.parentNode !== null ? el.parentNode : el.host;
    }
    if (token.endsWith(']')) {
        const posOfOpen = token.indexOf('[');
        const indxString = token.substring(posOfOpen + 1, token.length - 1);
        idx = parseInt(indxString);
        nonIndexedToken = token.substring(0, posOfOpen);
    }
    //const children = this.$0.querySelectorAll(':scope > ' + nonIndexedToken);
    const matchingNodes = [];
    getChildren(el).forEach((child) => {
        if (child.matches) {
            const iPosStart = nonIndexedToken.indexOf('#"');
            if (iPosStart !== -1) {
                const iPosEnd = nonIndexedToken.indexOf('"', iPosStart + 2);
                const id = nonIndexedToken.substring(iPosStart + 2, iPosEnd);
                if (child.id === id) {
                    matchingNodes.push(child);
                }
            }
            else if (child.matches(nonIndexedToken)) {
                matchingNodes.push(child);
            }
        }
    });
    return matchingNodes[idx];
}
export function substrBefore(s, search, last = false) {
}
