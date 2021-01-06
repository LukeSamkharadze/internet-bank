import { HTMLClass } from "./classes";

export function getCustomSymbol(dropdown: Element, HTMLClass: HTMLClass): Element | undefined {
  return Array.from(dropdown.children).find(o => o.classList.contains(HTMLClass));
}

export function getOptionSymbols(dropdown: Element, defaultSymbol: Element | undefined, optionCount: number): (Element | undefined)[] {
  let symbols = Array(optionCount).fill(undefined) as (Element | undefined)[];

  Array.from(dropdown.children).filter(o => o.tagName !== "SELECT").forEach(o => {
    if (o.getAttribute("index") != undefined)
      symbols[<any>o.getAttribute("index")] = o;
  });

  Array.from(dropdown.children).filter(o => o.tagName !== "SELECT").forEach(o => {
    if (o.getAttribute("index") == undefined)
      symbols[symbols.findIndex(o => o === undefined)] = o;
  });

  symbols = symbols.map(o => (o === undefined) ? defaultSymbol?.cloneNode(true) as Element : o);
  symbols.forEach(o => (o && "style" in o) ? (<any>o).style.flexShrink = "0" : void 0);

  return symbols;
}