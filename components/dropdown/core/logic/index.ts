import { DropdownClasses } from "./classes";

type Option = { selectIndex: number } & HTMLDivElement;

function isImplicityCustom(dropdown: Element): boolean {
  if (!dropdown.classList.contains(DropdownClasses.customOptionSymbols) &&
    !dropdown.classList.contains(DropdownClasses.customArrowSymbol))
    return true;

  return false;
}

function getCustomSymbols(dropdown: Element): Element[] {
  return Array.from(dropdown.childNodes).filter(o => (<HTMLDivElement>o).classList?.contains("fas")) as Element[];
}

function getArrowSymbol(dropdown: Element): Element | undefined {
  if (isImplicityCustom(dropdown) || dropdown.classList.contains(DropdownClasses.customArrowSymbol))
    return getCustomSymbols(dropdown)[0];

  return undefined;
}

function getOptionSymbols(dropdown: Element): (Element | undefined)[] | undefined {
  if (isImplicityCustom(dropdown) || dropdown.classList.contains(DropdownClasses.customOptionSymbols))
    return getCustomSymbols(dropdown);

  return undefined
}

function closeAllSelect(element: any): void {
  if ((<HTMLInputElement>document.getElementById(DropdownClasses.debug))?.checked)
    return;

  let selecteds = document.getElementsByClassName(DropdownClasses.selected);
  let options = document.getElementsByClassName(DropdownClasses.options);

  let current = -1;

  for (let i = 0; i < selecteds.length; i++)
    if (element === selecteds[i])
      current = i;
    else
      (<HTMLDivElement>selecteds[i].childNodes[1]).classList.remove(DropdownClasses.arrowActive);

  for (let i = 0; i < options.length; i++)
    if (i !== current)
      options[i].classList.add(DropdownClasses.displayNone);
}

function selectedClicked(this: HTMLDivElement, mouseEvent: MouseEvent): void {
  mouseEvent.stopPropagation();

  if (this.parentElement?.classList.contains(DropdownClasses.disabled))
    return;

  closeAllSelect(this);

  if (this.nextSibling)
    (<HTMLDivElement>this.nextSibling).classList.toggle(DropdownClasses.displayNone);
  (<HTMLDivElement>this.childNodes[1]).classList.toggle(DropdownClasses.arrowActive);
}

function optionClicked(this: Option, selected: HTMLDivElement, html_select: HTMLSelectElement): void {
  selected.classList.remove(DropdownClasses.placeholder);

  let foundTextElement = Array.from(selected.childNodes).find(o => (<HTMLDivElement>o).classList.contains(DropdownClasses.text));
  if (foundTextElement)
    (<HTMLDivElement>foundTextElement).innerHTML = this.innerText;

  html_select.selectedIndex = this.selectIndex;

  if (this.parentNode && this.parentNode.previousSibling)
    (<HTMLDivElement>this.parentNode.previousSibling).click();
}

function createSelectedDiv(dropdown: Element, html_select: HTMLSelectElement): HTMLDivElement {
  let selected = document.createElement("div");
  selected.setAttribute("class", `${DropdownClasses.selected} ${DropdownClasses.placeholder}`);

  let text = document.createElement("div");
  text.setAttribute("class", DropdownClasses.text);
  text.innerHTML = html_select.options[html_select.selectedIndex].innerHTML;
  selected.appendChild(text);

  let arrowContainer = document.createElement("div");
  arrowContainer.setAttribute("class", DropdownClasses.arrowContainer);

  let symbol = getArrowSymbol(dropdown);
  if (symbol)
    arrowContainer.appendChild(symbol);
  else {
    symbol = document.createElement("div");
    symbol.classList.add(DropdownClasses.arrowDefaultSymbol);
    arrowContainer.appendChild(symbol);
  }
  selected.appendChild(arrowContainer);

  return selected;
}

function createOptionDiv(html_option: HTMLOptionElement, symbol: Element | undefined): HTMLDivElement {
  let option = document.createElement("div");
  option.setAttribute("class", DropdownClasses.option);

  if (symbol)
    symbol.classList.add(DropdownClasses.optionCustomSymbol);
  else {
    symbol = document.createElement("div");
    symbol.setAttribute("class", DropdownClasses.optionDefaultSymbol);
  }
  option.appendChild(symbol);
  option.innerHTML += html_option.innerHTML;

  return option;
}

function createOptionsDiv(dropdown: Element, html_select: HTMLSelectElement, selected: HTMLDivElement): HTMLDivElement {
  let options = document.createElement("div");
  options.setAttribute("class", `${DropdownClasses.options} ${DropdownClasses.displayNone}`);

  let symbols = getOptionSymbols(dropdown);

  Array.from(html_select.options).slice(1).forEach((html_option, index) => {
    let option: Option;

    if (symbols)
      option = createOptionDiv(html_option, symbols[index]) as Option;
    else
      option = createOptionDiv(html_option, undefined) as Option;

    option.selectIndex = index + 1;
    option.addEventListener("click", optionClicked.bind(option, selected, html_select));
    options.appendChild(option);
  })

  return options;
}

function main() {
  for (let dropdown of document.querySelectorAll(`.${DropdownClasses.custom}, .${DropdownClasses.general}, .${DropdownClasses.generalSymbol}`)) {
    let html_select = dropdown.getElementsByTagName("select")[0];

    if (html_select === undefined)
      continue;

    let selected = createSelectedDiv(dropdown, html_select);
    let options = createOptionsDiv(dropdown, html_select, selected);
    dropdown.appendChild(selected);
    dropdown.appendChild(options);

    selected.addEventListener("click", selectedClicked);
  }

  document.addEventListener("click", closeAllSelect);
}

main();