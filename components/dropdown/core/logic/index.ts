interface ChildNode {
  classList: any;
  innerHTML: string;
  click(...args: any[]): void;
}

type Option = { selectIndex: number } & HTMLDivElement;

function isImplicityCustom(dropdown: Element): boolean {
  if (!dropdown.classList.contains("dropdown-custom-option-symbols") &&
    !dropdown.classList.contains("dropdown-custom-arrow-symbol"))
    return true;

  return false;
}

function getCustomSymbols(dropdown: Element): Element[] {
  return Array.from(dropdown.childNodes).filter(o => o.classList?.contains("fas")) as Element[];
}

function getArrowSymbol(dropdown: Element): Element | undefined {
  if (isImplicityCustom(dropdown) || dropdown.classList.contains("dropdown-custom-arrow-symbol"))
    return getCustomSymbols(dropdown)[0];

  return undefined;
}

function getOptionSymbols(dropdown: Element): (Element | undefined)[] | undefined {
  if (isImplicityCustom(dropdown) || dropdown.classList.contains("dropdown-custom-option-symbols"))
    return getCustomSymbols(dropdown);

  return undefined
}

function closeAllSelect(element: any): void {
  if ((<HTMLInputElement>document.getElementById("dropdown-debug"))?.checked)
    return;

  let selecteds = document.getElementsByClassName("selected");
  let options = document.getElementsByClassName("options");

  let current = -1;

  for (let i = 0; i < selecteds.length; i++)
    if (element === selecteds[i])
      current = i;
    else
      selecteds[i].childNodes[1].classList.remove("arrow-active");

  for (let i = 0; i < options.length; i++)
    if (i !== current)
      options[i].classList.add("dropdown-display-none");
}

function selectedClicked(this: HTMLDivElement, mouseEvent: MouseEvent): void {
  mouseEvent.stopPropagation();

  if (this.parentElement?.classList.contains("dropdown-disabled"))
    return;

  closeAllSelect(this);
  this.nextSibling?.classList.toggle("dropdown-display-none");
  this.childNodes[1].classList.toggle("arrow-active");
}

function optionClicked(this: Option, selected: HTMLDivElement, html_select: HTMLSelectElement): void {
  selected.classList.remove("placeholder");

  let foundTextElement = Array.from(selected.childNodes).find(o => o.classList.contains("text"));
  if (foundTextElement)
    foundTextElement.innerHTML = this.innerText;

  html_select.selectedIndex = this.selectIndex;

  this.parentNode?.previousSibling?.click();
}

function createSelectedDiv(dropdown: Element, html_select: HTMLSelectElement): HTMLDivElement {
  let selected = document.createElement("div");
  selected.setAttribute("class", "selected placeholder");

  let text = document.createElement("div");
  text.setAttribute("class", "text");
  text.innerHTML = html_select.options[html_select.selectedIndex].innerHTML;
  selected.appendChild(text);

  let arrowContainer = document.createElement("div");
  arrowContainer.setAttribute("class", "arrow-container");

  let symbol = getArrowSymbol(dropdown);
  if (symbol)
    arrowContainer.appendChild(symbol);
  else {
    symbol = document.createElement("div");
    symbol.classList.add("default-arrow-symbol");
    arrowContainer.appendChild(symbol);
  }
  selected.appendChild(arrowContainer);

  return selected;
}

function createOptionDiv(html_option: HTMLOptionElement, symbol: Element | undefined): HTMLDivElement {
  let option = document.createElement("div");
  option.setAttribute("class", "option");

  if (symbol)
    symbol.classList.add("custom-symbol");
  else {
    symbol = document.createElement("div");
    symbol.setAttribute("class", "default-symbol");
  }
  option.appendChild(symbol);
  option.innerHTML += html_option.innerHTML;

  return option;
}

function createOptionsDiv(dropdown: Element, html_select: HTMLSelectElement, selected: HTMLDivElement): HTMLDivElement {
  let options = document.createElement("div");
  options.setAttribute("class", "options dropdown-display-none");

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
  for (let dropdown of document.querySelectorAll(".dropdown-custom, .dropdown-general, .dropdown-general-symbol")) {
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