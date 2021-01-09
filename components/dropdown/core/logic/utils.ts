import { HTMLClass } from "./classes";

export function getCustomSymbol(dropdown: Element, HTMLClass: HTMLClass): Element | undefined {
  return Array.from(dropdown.children).find(o => o.classList.contains(HTMLClass));
}

export function getOptionSymbols(dropdown: Element, defaultSymbol: Element | undefined, optionCount: number): (Element | undefined)[] {
  let symbols = Array(optionCount).fill(undefined) as (Element | undefined)[];

  Array.from(dropdown.children).filter(o => o.tagName !== "SELECT").forEach(o => {
    let indexValue = Number(o.getAttribute("index"));
    if (indexValue)
      symbols[indexValue] = o;
  });

  Array.from(dropdown.children).filter(o => o.tagName !== "SELECT").forEach(o => {
    if (o.getAttribute("index") == null)
      symbols[symbols.findIndex(o => o === undefined)] = o;
  });

  symbols = symbols.map(o => (o === undefined) ? defaultSymbol?.cloneNode(true) as Element : o);
  symbols.forEach(o => (o && "style" in o) ? (<any>o).style.flexShrink = "0" : void 0);

  return symbols;
}

export function getPlaceholder(dropdown: Element, html_select: HTMLSelectElement | undefined): Element {
  let foundCustom = [...dropdown.children].find(o => o.classList.contains(HTMLClass.option))
  if (foundCustom)
    return foundCustom;

  let defaultPlaceholder = document.createElement("div");
  if (html_select)
    defaultPlaceholder.innerHTML = html_select.options[html_select.selectedIndex].innerHTML;
  return defaultPlaceholder;
}

export function getOptions(dropdown: Element, html_select: HTMLSelectElement | undefined, optionCount: number): Element[] {
  let options: Element[] = Array(optionCount).fill(undefined);

  [...dropdown.children].filter(o => o.classList.contains(HTMLClass.option)).forEach(o => {
    let indexValue = Number(o.getAttribute("index"));
    if (indexValue)
      options[indexValue] = o;
  });

  [...dropdown.children].filter(o => o.classList.contains(HTMLClass.option)).forEach(o => {
    if (o.getAttribute("index") == null)
      options[options.findIndex(o => o === undefined)] = o;
  });

  options.forEach((option, index) => {
    if (!option) {
      let optionFromHTMLSelect = document.createElement("div");
      optionFromHTMLSelect.setAttribute("class", "text");
      optionFromHTMLSelect.innerText = html_select!.options[index + 1].innerHTML;
      options[index] = optionFromHTMLSelect;
    }
  })

  return options;
}