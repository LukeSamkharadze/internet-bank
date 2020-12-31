interface ChildNode {
  classList: any;
  innerHTML: string;
  click(...args: any[]): void;
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
      selecteds[i].classList.remove("arrow-active");

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
  this.classList.toggle("arrow-active");
}

function optionClicked(this: HTMLDivElement, selected: HTMLDivElement, html_select: HTMLSelectElement): void {
  selected.classList.remove("placeholder")

  for (let i = 0; i < html_select.length; i++)
    if (html_select.options[i].innerHTML == this.innerHTML) {
      html_select.selectedIndex = i;

      if (this.parentNode?.previousSibling?.innerHTML)
        this.parentNode.previousSibling.innerHTML = this.innerHTML;

      break;
    }

  this.parentNode?.previousSibling?.click();
}

function createSelectedDiv(html_select: HTMLSelectElement): HTMLDivElement {
  let selected = document.createElement("div");
  selected.setAttribute("class", "selected placeholder");
  selected.innerHTML = html_select.options[html_select.selectedIndex].innerHTML;
  return selected;
}

function createOptionDiv(html_option: HTMLOptionElement): HTMLDivElement {
  let optionDiv = document.createElement("div");
  optionDiv.setAttribute("class", "option");
  optionDiv.innerHTML = html_option.innerHTML;
  return optionDiv;
}

function createOptionsDiv(html_select: HTMLSelectElement, selected: HTMLDivElement): HTMLDivElement {
  let options = document.createElement("div");
  options.setAttribute("class", "options dropdown-display-none");

  for (let html_option of Array.from(html_select.options).slice(1)) {
    let option = createOptionDiv(html_option);
    option.addEventListener("click", optionClicked.bind(option, selected, html_select));
    options.appendChild(option);
  }

  return options;
}

function getDropdowns(): Element[] {
  let dropdownClasses = ["dropdown-general", "dropdown-select", "dropdown-field"]
  let dropdowns: Element[] = [];

  for (let dropdown of document.querySelectorAll("*"))
    if (dropdownClasses.some(o => dropdown.classList.contains(o)))
      dropdowns.push(dropdown);

  return dropdowns;
}

function main() {
  let dropdowns = getDropdowns();

  for (let dropdown of dropdowns) {
    let html_select = dropdown.getElementsByTagName("select")[0];

    if (html_select === undefined)
      continue;

    let selected = createSelectedDiv(html_select);
    let options = createOptionsDiv(html_select, selected);
    dropdown.appendChild(selected);
    dropdown.appendChild(options);

    selected.addEventListener("click", selectedClicked);
  }

  document.addEventListener("click", closeAllSelect);
}

main();