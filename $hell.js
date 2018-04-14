//declare var $0
class $hell {
    static get pwd() {
        return this.pathHistory.join('/');
    }
    static cd(path) {
        if (!this.$0 || path.startsWith('/')) {
            this.$0 = document.body;
            this.pathHistory = [''];
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
            let context = this.$0;
            if (context.shadowRoot)
                context = context.shadowRoot;
            const children = this.$0.querySelectorAll(':scope > ' + nonIndexedToken);
            this.$0 = children[idx];
        });
        return this.$0;
    }
    static ls() {
        //cshell
    }
}
//# sourceMappingURL=$hell.js.map