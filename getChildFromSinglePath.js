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
        if (child.matches && child.matches(nonIndexedToken)) {
            matchingNodes.push(child);
        }
    });
    return matchingNodes[idx];
}
