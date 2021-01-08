import { HTMLClass } from "./classes";
import { Option } from "./types";
import * as utils from "./utils";
import * as events from "./events"

export function createSelectedDiv(dropdown: Element, html_select: HTMLSelectElement): HTMLDivElement {
  let selected = document.createElement("div");
  selected.setAttribute("class", `${HTMLClass.selected} ${HTMLClass.placeholder}`);

  let text = document.createElement("div");
  text.setAttribute("class", HTMLClass.text);
  text.innerHTML = html_select.options[html_select.selectedIndex].innerHTML;
  selected.appendChild(text);

  let arrowContainer = document.createElement("div");
  arrowContainer.setAttribute("class", HTMLClass.arrowContainer);

  let symbol = utils.getCustomSymbol(dropdown, HTMLClass.customArrowSymbol);

  if (symbol)
    arrowContainer.appendChild(symbol);
  else {
    symbol = document.createElement("div");
    symbol.classList.add(HTMLClass.arrowDefaultSymbol);
    arrowContainer.appendChild(symbol);
  }

  selected.appendChild(arrowContainer);

  return selected;
}

export function createOptionsDiv(dropdown: Element, html_select: HTMLSelectElement, selected: HTMLDivElement): Element {
  let options = document.createElement("div");
  options.setAttribute("class", `${HTMLClass.options} ${HTMLClass.hidden}`);

  let defaultOptionSymbol = utils.getCustomSymbol(dropdown, HTMLClass.customOptionDefaultSymbol);
  defaultOptionSymbol?.remove();
  let symbols = utils.getOptionSymbols(dropdown, defaultOptionSymbol, html_select.options.length);

  Array.from(html_select.options).slice(1).forEach((html_option, index) => {
    let option = createOptionDiv(dropdown, html_option, symbols[index]) as Option;
    option.selectIndex = index + 1;
    option.addEventListener("click", events.optionClicked.bind(option, selected, html_select, false));
    options.appendChild(option);
  })

  return options;
}

export function createOptionDiv(dropdown: Element, html_option: HTMLOptionElement, symbol: Element | undefined): Element {
  let option = document.createElement("div");
  option.setAttribute("class", HTMLClass.option);

  if (symbol) {
    symbol.classList.add(HTMLClass.optionCustomSymbol);
    option.appendChild(symbol);
  }
  else if (dropdown.classList.contains(HTMLClass.generalSymbol)) {
    symbol = document.createElement("div");
    symbol.setAttribute("class", HTMLClass.optionDefaultSymbol);
    option.appendChild(symbol);
  }

  option.innerHTML += html_option.innerHTML;

  return option;
}

export function createCustomSelectedDiv(dropdown: Element): HTMLDivElement {
  let selected = document.createElement("div");
  selected.setAttribute("class", `${HTMLClass.selected} ${HTMLClass.placeholder}`);

  let text = document.createElement("div");
  text.setAttribute("class", HTMLClass.text);
  text.appendChild(dropdown.children[0]);
  selected.appendChild(text);

  let arrowContainer = document.createElement("div");
  arrowContainer.setAttribute("class", HTMLClass.arrowContainer);

  let symbol = utils.getCustomSymbol(dropdown, HTMLClass.customArrowSymbol);

  if (symbol)
    arrowContainer.appendChild(symbol);
  else {
    symbol = document.createElement("div");
    symbol.classList.add(HTMLClass.arrowDefaultSymbol);
    arrowContainer.appendChild(symbol);
  }

  selected.appendChild(arrowContainer);

  return selected;
}

export function createCustomOptionsDiv(dropdown: Element, html_select: HTMLSelectElement | undefined, selected: HTMLDivElement): Element {
  let options = document.createElement("div");
  options.setAttribute("class", `${HTMLClass.options} ${HTMLClass.hidden}`);

  // let defaultOptionSymbol = utils.getCustomSymbol(dropdown, HTMLClass.customOptionDefaultSymbol);
  // defaultOptionSymbol?.remove();
  // let symbols = utils.getOptionSymbols(dropdown, defaultOptionSymbol, html_select.options.length);

  Array.from(dropdown.children).filter(o => o.classList.contains(HTMLClass.fullCustomOption)).slice(1).forEach((customOption, index) => {
    let option = createCustomOptionDiv(dropdown, customOption) as Option;
    option.selectIndex = index + 1;
    option.addEventListener("click", events.optionClicked.bind(option, selected, html_select, true));
    options.appendChild(option);
  })

  return options;
}

export function createCustomOptionDiv(dropdown: Element, customOption: Element): Element {
  let option = document.createElement("div");
  option.setAttribute("class", HTMLClass.option);
  option.innerHTML = customOption.innerHTML;
  return option;
}