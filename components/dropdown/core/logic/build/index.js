"use strict";
function closeAllSelect(element) {
    var _a;
    if ((_a = document.getElementById("dropdown-debug")) === null || _a === void 0 ? void 0 : _a.checked)
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
            options[i].classList.add("display-none");
}
function selectedClicked(mouseEvent) {
    var _a, _b;
    mouseEvent.stopPropagation();
    if ((_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.classList.contains("dropdown-disabled"))
        return;
    closeAllSelect(this);
    (_b = this.nextSibling) === null || _b === void 0 ? void 0 : _b.classList.toggle("display-none");
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
