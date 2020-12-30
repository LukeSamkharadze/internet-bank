interface ChildNode {
  classList: any;
  innerHTML: string;
  click(...args: any[]): void;
}

function closeAllSelect(element: any): void {
  let selecteds = document.getElementsByClassName("selected");
  let options = document.getElementsByClassName("options");

  let current = -1;

  for (let i = 0; i < selecteds.length; i++)
    if (element === selecteds[i])
      current = i;
    else
      selecteds[i].classList.remove("arrow-active");

  for (let i = 0; i < options.length; i++)
    if(i !== current)
      options[i].classList.add("display-none");
}

function selectedClicked(this: HTMLDivElement, mouseEvent: MouseEvent): void {

  mouseEvent.stopPropagation();
  closeAllSelect(this);
  this.nextSibling?.classList.toggle("display-none");
  this.classList.toggle("arrow-active");
}

function optionClicked(this: HTMLDivElement, selected: HTMLDivElement, html_select: HTMLSelectElement) {
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

function getSelectedDiv(html_select: HTMLSelectElement) {
  let selected = document.createElement("div");
  selected.setAttribute("class", "selected placeholder");
  selected.innerHTML = html_select.options[html_select.selectedIndex].innerHTML;
  return selected;
}

function getOptionDiv(html_option: HTMLOptionElement) {
  let optionDiv = document.createElement("div");
  optionDiv.innerHTML = html_option.innerHTML;
  return optionDiv;
}

function getOptionsDiv(html_select: HTMLSelectElement, selected: HTMLDivElement) {
  let options = document.createElement("div");
  options.setAttribute("class", "options display-none");

  for (let html_option of Array.from(html_select.options).slice(1)) {
    let option = getOptionDiv(html_option);
    option.addEventListener("click", optionClicked.bind(option, selected, html_select));
    options.appendChild(option);
  }

  return options;
}

function main() {
  for (let select of document.getElementsByClassName("dropdown-general")) {
    let html_select = select.getElementsByTagName("select")[0];

    if (html_select === undefined)
      continue;

    let selected = getSelectedDiv(html_select);
    let options = getOptionsDiv(html_select, selected);
    select.appendChild(selected);
    select.appendChild(options);

    selected.addEventListener("click", selectedClicked);
  }

  document.addEventListener("click", closeAllSelect);
}

main();