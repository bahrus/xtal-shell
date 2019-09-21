import { $hell } from './$hell.js';
export class PetaliaConnector {
    constructor(el1, el0) {
        this.el1 = el1;
        this.el0 = el0;
        this.destProps = {};
        this._destProp = 'please specify destProp';
        const props = $hell.getProperties(el0);
        for (const key in props) {
            this.destProps[key] = key;
        }
        const de = el1.dispatchEvent.bind(el1);
        el1.dispatchEvent = e => {
            console.log('Evt', e);
            console.log(`
    <p-d on=${e.type} to=${el0.localName}[-${this._destProp}] val=pleaseProvideFromEvt m=1 skip-init></p-d>
          `);
            return de(e);
        };
    }
    camelToSnake(string) {
        return string.replace(/[\w]([A-Z])/g, function (m) {
            return m[0] + "-" + m[1];
        }).toLowerCase();
    }
    set destProp(val) {
        const lispCase = this.camelToSnake(val);
        this._destProp = lispCase;
        if (!this.el0.hasAttribute('-' + lispCase)) {
            console.log('Please remember to add attribute ' + '-' + lispCase + ' to ' + this.el0.localName);
        }
    }
    get destProp() {
        return this._destProp;
    }
}
