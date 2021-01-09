import { HTMLClass } from "./classes";
import { Option } from "./types";
import * as utils from "./utils";
import * as events from "./events"

export function createSelectedDiv(dropdown: Element, html_select: HTMLSelectElement | undefined): HTMLDivElement {
  let selected = document.createElement("div");
  selected.setAttribute("class", `${HTMLClass.selected} ${HTMLClass.placeholder}`);

  let content = document.createElement("div");
  content.setAttribute("class", HTMLClass.selectedContent);
  let placeholder = utils.getPlaceholder(dropdown, html_select);
  placeholder.remove();
  content.innerHTML = placeholder.innerHTML;
  selected.appendChild(content);

  let arrowContainer = document.createElement("div");
  arrowContainer.setAttribute("class", HTMLClass.arrowContainer);

  let symbol = utils.getCustomSymbol(dropdown, HTMLClass.arrowExplicitSymbol);

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

export function createOptionsDiv(dropdown: Element, html_select: HTMLSelectElement | undefined, selected: HTMLDivElement): Element {
  let options = document.createElement("div");
  options.setAttribute("class", `${HTMLClass.options} ${HTMLClass.hidden}`);

  let defaultOptionSymbol = utils.getCustomSymbol(dropdown, HTMLClass.optionExplicitSymbol);
  defaultOptionSymbol?.remove();

  let optionCount = Math.max(
    [...dropdown.children].filter(o => o.classList.contains(HTMLClass.option)).length,
    (html_select) ? html_select.options.length - 1 : 0);

  let symbols = utils.getOptionSymbols(dropdown, defaultOptionSymbol, optionCount);
  let rawOptions = utils.getOptions(dropdown, html_select, optionCount);

  rawOptions.forEach((rawOption, index) => {
    let isCustom = !rawOption.classList.contains(HTMLClass.textFlag);
    let option = createOptionDiv(dropdown, rawOption, symbols[index], isCustom) as Option;
    option.selectIndex = index + 1;
    option.addEventListener("click", events.optionClicked.bind(option, selected, html_select, isCustom));
    options.appendChild(option);
  })

  return options;
}

export function createOptionDiv(dropdown: Element, rawOption: Element, symbol: Element | undefined, isCustom: boolean): Element {
  let option = document.createElement("div");
  option.setAttribute("class", HTMLClass.option);

  if (!isCustom) {
    if (symbol) {
      symbol.classList.add(HTMLClass.optionCustomSymbol);
      option.appendChild(symbol);
    }
    else if (dropdown.classList.contains(HTMLClass.generalSymbol) || dropdown.classList.contains(HTMLClass.custom)) {
      symbol = document.createElement("div");
      symbol.setAttribute("class", HTMLClass.optionDefaultSymbol);
      option.appendChild(symbol);
    }
  }

  option.innerHTML += rawOption.innerHTML;

  return option;
}