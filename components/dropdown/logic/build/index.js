"use strict";
function closeAllSelect(element) {
    let selecteds = document.getElementsByClassName("selected");
    let options = document.getElementsByClassName("option");
    for (let i = 0; i < selecteds.length; i++)
        if (element !== selecteds[i]) {
            selecteds[i].classList.remove("arrow-active");
            for (let j = 0; j < options.length; j++)
                options[j].classList.add("display-none");
        }
}
function selectedClicked(mouseEvent) {
    var _a;
    mouseEvent.stopPropagation();
    closeAllSelect(this);
    (_a = this.nextSibling) === null || _a === void 0 ? void 0 : _a.classList.toggle("display-none");
    this.classList.toggle("arrow-active");
}
function optionClicked(selected, html_select) {
    var _a, _b, _c, _d;
    selected.classList.remove("placeholder");
    for (let i = 0; i < html_select.length; i++)
        if (html_select.options[i].innerHTML == this.innerHTML) {
            html_select.selectedIndex = i;
            if ((_b = (_a = this.parentNode) === null || _a === void 0 ? void 0 : _a.previousSibling) === null || _b === void 0 ? void 0 : _b.innerHTML)
                this.parentNode.previousSibling.innerHTML = this.innerHTML;
            break;
        }
    (_d = (_c = this.parentNode) === null || _c === void 0 ? void 0 : _c.previousSibling) === null || _d === void 0 ? void 0 : _d.click();
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
