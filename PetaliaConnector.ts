export class PetaliaConnector{
    constructor(public el1: HTMLElement, public el0: HTMLElement){
        const de = el1.dispatchEvent.bind(el1);
        el1.dispatchEvent = e => {
          console.log(`
    <p-d on=${e.type} ></p-d>
          `)
          return de(e);
        };
    }
}