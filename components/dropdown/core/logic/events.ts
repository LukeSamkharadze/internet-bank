import { HTMLClass } from "./classes";
import * as types from "./types";

export function closeAllSelect(element: any): void {
  if ((<HTMLInputElement>document.getElementById(HTMLClass.debug))?.checked)
    return;

  let selecteds = document.getElementsByClassName(HTMLClass.selected);
  let options = document.querySelectorAll(`.${HTMLClass.options}, .dropdown-full-custom .select .options`);

  let current = -1;

  for (let i = 0; i < selecteds.length; i++)
    if (element === selecteds[i])
      current = i;
    else
      selecteds[i].children[1]?.classList.remove(HTMLClass.arrowActive);

  for (let i = 0; i < options.length; i++)
    if (i !== current)
      options[i].classList.add(HTMLClass.hidden);
}

export function selectedClicked(this: Element, mouseEvent: MouseEvent): void {
  mouseEvent.stopPropagation();

  if (this.parentElement?.classList.contains(HTMLClass.disabled))
    return;

  closeAllSelect(this);

  if (this.nextSibling)
    (<Element>this.nextSibling)?.classList.toggle(HTMLClass.hidden);
  this.children[1]?.classList.toggle(HTMLClass.arrowActive);
}

export function optionClicked(this: types.Option, selected: HTMLDivElement, html_select: HTMLSelectElement | undefined, isCustom: boolean): void {
  selected.classList.remove(HTMLClass.placeholder);

  let foundTextElement = [...selected.children].find(o => (o).classList.contains(HTMLClass.text));
  if (foundTextElement)
    foundTextElement.innerHTML = (isCustom) ? this.innerHTML : this.innerText;

  if (html_select)
    html_select.selectedIndex = this.selectIndex;

  selected.click();
}