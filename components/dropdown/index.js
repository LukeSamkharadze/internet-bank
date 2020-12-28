for (let select_inactive of document.getElementsByClassName("select-inactive")) {
  let select = select_inactive.getElementsByTagName("select")[0];
  if (select === undefined)
    continue;

  // for each element, create a new DIV that will act as the selected item
  let selected = document.createElement("div");
  selected.setAttribute("class", "select-selected selected-placeholder");
  selected.innerHTML = select.options[select.selectedIndex].innerHTML;
  select_inactive.appendChild(selected);

  // for each element, create selected new DIV that will contain the option list
  let optionDivs = document.createElement("div");
  optionDivs.setAttribute("class", "select-items select-hide");

  for (let option of Array.from(select.options).slice(1)) {
    // for each option in the original select element, create selected new DIV that will act as an option item
    let optionDiv = document.createElement("div");
    optionDiv.innerHTML = option.innerHTML;

    optionDiv.addEventListener("click", function (e) {
      // when an item is clicked, update the original select box, and the selected item:
      selected.classList.remove("selected-placeholder")
      let s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      let h = this.parentNode.previousSibling;

      for (let i = 0; i < s.length; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          let y = this.parentNode.getElementsByClassName("same-as-selected");

          for (let k = 0; k < y.length; k++)
            y[k].removeAttribute("class");

          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    optionDivs.appendChild(optionDiv);
  }

  select_inactive.appendChild(optionDivs);

  selected.addEventListener("click", function (e) {
    // when the select box is clicked, close any other select boxes and open/close the current select box
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  let x = document.getElementsByClassName("select-items");
  let y = document.getElementsByClassName("select-selected");
  let arrNo = [];

  for (let i = 0; i < y.length; i++)
    if (elmnt == y[i])
      arrNo.push(i)
    else
      y[i].classList.remove("select-arrow-active");

  for (let i = 0; i < x.length; i++)
    if (arrNo.indexOf(i))
      x[i].classList.add("select-hide");
}

// if the user clicks anywhere outside the select box, then close all select boxes
document.addEventListener("click", closeAllSelect);