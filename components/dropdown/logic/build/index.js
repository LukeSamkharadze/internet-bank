"use strict";
function closeAllSelect(elmnt) {
    var x = document.getElementsByClassName("option");
    var y = document.getElementsByClassName("selected");
    var arrNo = [];
    for (var i = 0; i < y.length; i++)
        if (elmnt == y[i])
            arrNo.push(i);
        else
            y[i].classList.remove("arrow-active");
    for (var i = 0; i < x.length; i++)
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
    selected.classList.remove("placeholder");
    for (var i = 0; i < html_select.length; i++)
        if (html_select.options[i].innerHTML == this.innerHTML) {
            html_select.selectedIndex = i;
            this.parentNode.previousSibling.innerHTML = this.innerHTML;
            break;
        }
    this.parentNode.previousSibling.click();
}
function getSelectedDiv(html_select) {
    var selected = document.createElement("div");
    selected.setAttribute("class", "selected placeholder");
    selected.innerHTML = html_select.options[html_select.selectedIndex].innerHTML;
    return selected;
}
function getOptionDiv(html_option) {
    var optionDiv = document.createElement("div");
    optionDiv.innerHTML = html_option.innerHTML;
    return optionDiv;
}
function getOptionsDiv(html_select, selected) {
    var options = document.createElement("div");
    options.setAttribute("class", "option display-none");
    for (var _i = 0, _a = Array.from(html_select.options).slice(1); _i < _a.length; _i++) {
        var html_option = _a[_i];
        var option = getOptionDiv(html_option);
        option.addEventListener("click", optionClicked.bind(option, selected, html_select));
        options.appendChild(option);
    }
    return options;
}
function main() {
    for (var _i = 0, _a = document.getElementsByClassName("dropdown-select"); _i < _a.length; _i++) {
        var select = _a[_i];
        var html_select = select.getElementsByTagName("select")[0];
        if (html_select === undefined)
            continue;
        var selected = getSelectedDiv(html_select);
        var options = getOptionsDiv(html_select, selected);
        select.appendChild(selected);
        select.appendChild(options);
        selected.addEventListener("click", selectedClicked);
    }
    document.addEventListener("click", closeAllSelect);
}
main();
