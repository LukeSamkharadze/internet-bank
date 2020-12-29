function closeAllSelect(elmnt) {
  let x = document.getElementsByClassName("option");
  let y = document.getElementsByClassName("selected");
  let arrNo = [];

  for (let i = 0; i < y.length; i++)
    if (elmnt == y[i])
      arrNo.push(i)
    else
      y[i].classList.remove("arrow-active");

  for (let i = 0; i < x.length; i++)
    if (arrNo.indexOf(i))
      x[i].classList.add("display-none");
}

function selectedClicked(mouseEvent) {
  mouseEvent.stopPropagation();
  closeAllSelect(this);
  this.nextSibling.classList.toggle("display-none");
  this.classList.toggle("arrow-active");
}

function optionClicked(selected, html_select, options) {
  selected.classList.remove("placeholder")

  for (let i = 0; i < html_select.length; i++)
    if (html_select.options[i].innerHTML == this.innerHTML) {
      html_select.selectedIndex = i;
      this.parentNode.previousSibling.innerHTML = this.innerHTML;
      break;
    }

  this.parentNode.previousSibling.click();
}

function getSelectedDiv(html_select) {
  let selected = document.createElement("div");
  selected.setAttribute("class", "selected placeholder");
  selected.innerHTML = html_select.options[html_select.selectedIndex].innerHTML;
  return selected;
}

function getOptionDiv(html_option) {
  let optionDiv = document.createElement("div");
  optionDiv.innerHTML = html_option.innerHTML;
  return optionDiv;
}

function getOptionsDiv(html_select, selected) {
  let options = document.createElement("div");
  options.setAttribute("class", "option display-none");

  for (let html_option of Array.from(html_select.options).slice(1)) {
    let option = getOptionDiv(html_option);
    option.addEventListener("click", optionClicked.bind(option, selected, html_select));
    options.appendChild(option);
  }

  return options;
}

function main() {
  for (let select of document.getElementsByClassName("dropdown-select")) {
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