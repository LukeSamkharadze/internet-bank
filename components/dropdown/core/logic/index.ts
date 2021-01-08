import { HTMLClass } from "./classes";
import * as events from "./events";
import * as creators from "./creators"

function main(): void {
  for (let dropdown of document.querySelectorAll(`.${HTMLClass.custom}, .${HTMLClass.general}, .${HTMLClass.generalSymbol}, .${HTMLClass.fullCustom}`)) {
    let html_select: HTMLSelectElement = dropdown.getElementsByTagName("select")[0];
    let selected: HTMLDivElement;

    if (dropdown.classList.contains(HTMLClass.fullCustom)) {
      selected = creators.createCustomSelectedDiv(dropdown);
      let options = creators.createCustomOptionsDiv(dropdown, html_select, selected);
      dropdown.appendChild(selected);
      dropdown.appendChild(options);
    }
    else {
      if (html_select === undefined)
        continue;

      selected = creators.createSelectedDiv(dropdown, html_select);
      let options = creators.createOptionsDiv(dropdown, html_select, selected);
      dropdown.appendChild(selected);
      dropdown.appendChild(options);
    }

    selected.addEventListener("click", events.selectedClicked);
  }

  document.addEventListener("click", events.closeAllSelect);
}

main();