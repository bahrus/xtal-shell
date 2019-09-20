import {$hell} from './$hell.js';
export class PetaliaConnector{
    destProps: {[key: string]: string} = {};
    constructor(public el1: HTMLElement, public el0: HTMLElement){
        const props = $hell.getProperties(el0);
        for(const key in props){
            this.destProps[key] = key;
        }
        const de = el1.dispatchEvent.bind(el1);
        el1.dispatchEvent = e => {
          console.log(`
    <p-d on=${e.type} to=${el0.localName}[-${this._destProp}] ></p-d>
          `)
          return de(e);
        };
    }
    _destProp: string = 'please specify destProp';
    set destProp(val){
        this._destProp = val;
    }
    get destProp(){
        return this._destProp;
    }
}