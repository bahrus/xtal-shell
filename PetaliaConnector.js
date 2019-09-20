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
            console.log(`
    <p-d on=${e.type} to=${el0.localName}[-${this._destProp}] ></p-d>
          `);
            return de(e);
        };
    }
    set destProp(val) {
        this._destProp = val;
    }
    get destProp() {
        return this._destProp;
    }
}
