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

export function createOptionDiv(html_option: HTMLOptionElement, symbol: Element | undefined): Element {
  let option = document.createElement("div");
  option.setAttribute("class", HTMLClass.option);

  if (symbol)
    symbol.classList.add(HTMLClass.optionCustomSymbol);
  else {
    symbol = document.createElement("div");
    symbol.setAttribute("class", HTMLClass.optionDefaultSymbol);
  }

  option.appendChild(symbol);
  option.innerHTML += html_option.innerHTML;

  return option;
}

export function createOptionsDiv(dropdown: Element, html_select: HTMLSelectElement, selected: HTMLDivElement): Element {
  let options = document.createElement("div");
  options.setAttribute("class", `${HTMLClass.options} ${HTMLClass.optionsHidden}`);

  let defaultOptionSymbol = utils.getCustomSymbol(dropdown, HTMLClass.customOptionDefaultSymbol);
  defaultOptionSymbol?.remove();
  let symbols = utils.getOptionSymbols(dropdown, defaultOptionSymbol, html_select.options.length);

  Array.from(html_select.options).slice(1).forEach((html_option, index) => {
    let option = createOptionDiv(html_option, symbols[index]) as Option;
    option.selectIndex = index + 1;
    option.addEventListener("click", events.optionClicked.bind(option, selected, html_select));
    options.appendChild(option);
  })

  return options;
}