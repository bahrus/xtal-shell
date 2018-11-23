const elems = document.body.getElementsByTagName("*");
for(let i = 0, ii = elems.length; i++; i < ii){
    const elem = elems[i];
    const ln = elem.localName;
    if(ln.indexOf('-') > -1){
        if(customElements.get(ln)){
            console.log(ln);
        }
    }
}