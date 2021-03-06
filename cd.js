import { getChildFromSinglePath } from './getChildFromSinglePath.js';
export function cd(el, path, pathHistory) {
    const splitPath = path.split('/');
    let ctx = path.startsWith('/') ? document.body : el;
    splitPath.forEach(token => {
        if (!token)
            return;
        if (pathHistory)
            pathHistory.push(token);
        ctx = getChildFromSinglePath(ctx, token);
    });
    return ctx;
}
