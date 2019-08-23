const cs_src = self['_$hell'] ? _$hell.href : document.currentScript.src;
if (!self['_$hell']) {
    self['_$hell'] = {};
}
_$hell['load'] = () => {
    const script = document.createElement('script');
    const base = cs_src.split('/');
    base.pop();
    const baseHref = base.join('/');
    script.src = baseHref + '/$hell.js';
    document.head.appendChild(script);
};
