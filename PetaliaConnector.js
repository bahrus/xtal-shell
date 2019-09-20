export class PetaliaConnector {
    constructor(el1, el0) {
        this.el1 = el1;
        this.el0 = el0;
        const de = el1.dispatchEvent.bind(el1);
        el1.dispatchEvent = e => {
            console.log(`
    <p-d on=${e.type} ></p-d>
          `);
            return de(e);
        };
    }
}
