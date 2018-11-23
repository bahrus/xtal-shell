const elems = document.body.getElementsByTagName("*");
console.log(elems.length);
for (let i = 0, ii = elems.length; i < ii; i++) {
    const elem = elems[i];
    const ln = elem.localName;
    if (ln.indexOf('-') > -1) {
        if (customElements.get(ln)) {
            console.log(ln);
        }
    }
}
//# sourceMappingURL=getAllCE.js.map