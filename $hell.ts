import { getChildren } from "./getChildren.js";
import { getChildFromSinglePath } from "./getChildFromSinglePath.js";
import { cd } from "./cd.js";
import { dashToCamelCase } from "./dashToCamelCase.js";
import {PetaliaConnector} from './PetaliaConnector.js';


const idSym = Symbol("iframeId");
window[idSym] = "self";
const allWindows = Array.from(document.head.querySelectorAll("iframe"))
  .map(iframe => {
    iframe[idSym] = iframe.id;
    return iframe.contentWindow;
  })
  .concat(window);
export class $hell {
  static $0: HTMLElement;
  static pathHistory: string[] = [];
  static get pwd() {
    return this.pathHistory.join("/");
  }
  static initialize() {
    this.$0 = document.body;
    this.pathHistory = [""];
  }
  static cd(path: string) {
    if (!this.$0 || path.startsWith("/")) {
      this.initialize();
    }
    this.$0 = cd(this.$0, path, this.pathHistory);
    return this.$0;
  }

  static monitor(el?: HTMLElement){
    if(!el) el = this.$0;
    const de = el.dispatchEvent.bind(el);
    el.dispatchEvent = e => {
        console.log(e);
        return de(e);
    }
  }


  static connect(el1: HTMLElement, el0: HTMLElement) {
    const pc = new PetaliaConnector(el1, el0);
    return pc;
  }

  static get children() {
    // switch(this.$0.nodeName){
    //     case 'IFRAME':
    //         return (this.$0 as HTMLIFrameElement).contentWindow.document.body.childNodes;
    //     default:
    //         if(this.$0.childNodes.length === 0 && this.$0.shadowRoot) return this.$0.shadowRoot.childNodes;
    //         return this.$0.childNodes;
    // }
    return getChildren(this.$0);
  }
  static getList(children: HTMLElement[]) {
    const result = [];
    const matchingNodeNames: { [key: string]: HTMLElement[] } = {};
    children.forEach((node: HTMLElement) => {
      if (!node.matches) return;
      const nodeName = node.nodeName.toLowerCase();
      if (node.id) {
        let id = node.id;
        if(id.includes('[') || id.includes(']') || id.includes('#') || id.includes('/')){
          id = '"' + id + '"';
        }
        result.push(nodeName + "#" + id);
        //return;
      }
      if (!matchingNodeNames[nodeName]) {
        matchingNodeNames[nodeName] = [];
      }
      matchingNodeNames[nodeName].push(node);
    });
    for (const key in matchingNodeNames) {
      const matchingNodes = matchingNodeNames[key];
      if (matchingNodes.length === 1) {
        const matchingNode = matchingNodes[0];
        if (!matchingNode.id) {
          result.push(key);
          continue;
        }
      }
      const test = matchingNodes.filter(node => !node.id);
      if (test.length === 0) continue;
      for (let i = 0, ii = matchingNodes.length; i < ii; i++) {
        const matchingNode = matchingNodes[i];
        if (matchingNode.id) continue;
        result.push(key + "[" + i + "]");
      }
    }
    return result;
  }
  static get ls() {
    if (!this.$0) {
      this.initialize();
    }
    return this.getList(this.children);
  }

  static get properties() {
    return this.getProperties(this.$0);
  }

  static getProperties(el: HTMLElement) {
    this.$0 = el;
    const tagName = el.tagName.toLowerCase();
    const ce = customElements.get(tagName);
    if (!ce) {
      console.log("props only provides information for custom elements.");
      return;
    }
    //if(!propertiesAlias) propertiesAlias = 'properties';
    const props = ce["properties"] || {};
    const observedAttributes = ce["observedAttributes"] as string[];
    if (observedAttributes) {
      observedAttributes.forEach(attrib => {
        const camelCase = dashToCamelCase(attrib);
        props[camelCase] = true;
      });
    }
    Object.getOwnPropertyNames(el)
      .map(name => name.replace("_", ""))
      .forEach(name => {
        props[name] = true;
      });
    if (!props) {
      console.log("No properties found");
    }
    const debugObj = {
      constructor: ce
    };
    for (const key in props) {
      const underScore = "_" + key;
      if (!this.$0[key] && this.$0[underScore]) {
        debugObj[underScore] = this.$0[underScore];
      } else {
        debugObj[key] = this.$0[key];
      }
    }
    return debugObj;
  }

  static getParent(el: Element) {
    const parent = el.parentNode as HTMLElement;
    if (parent.nodeType === 11) {
      return parent["host"];
    }
    return parent;
  }

  static getPathFromParent(el: Element) {
    const parent = this.getParent(el);
    const list = this.getList(getChildren(parent));
    let path = "";
    list.forEach(token => {
      const testEl = getChildFromSinglePath(parent, token);
      if (testEl === el) {
        path = token;
      }
    });
    return path;
  }

  static getFullPath(el: Element) {
    const reversePathArray = [];
    let ancestor = el;
    while (ancestor.tagName !== "BODY") {
      const path = this.getPathFromParent(ancestor);
      reversePathArray.push(path);
      ancestor = this.getParent(ancestor);
      if (ancestor.tagName === "BODY") {
        const fe = ancestor.ownerDocument.defaultView.frameElement;
        if (fe) {
          ancestor = fe as Element;
        }
      }
    }

    reversePathArray.reverse();
    return "/" + reversePathArray.join("/");
  }
  static get stores() {
    const returnObj = {};
    Array.from(allWindows).forEach(win => {
      returnObj[win[idSym]] = win.history.state;
    });
    console.log("stores", returnObj);
    return returnObj;
  }
}
window["$hell"] = $hell;
Array.from(allWindows).forEach(win => {
  win.addEventListener("history-state-update", e => {
    console.log("history-changed", e.target[idSym], (<any>e).detail);
  });
  win.addEventListener("popstate", e => {
    console.log("popstate", e.target[idSym], (<any>e).detail);
  });
  $hell.stores;
});
