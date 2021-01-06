import { HTMLClass } from "./classes";
import * as events from "./events";
import * as creators from "./creators"

function main() {
  for (let dropdown of document.querySelectorAll(`.${HTMLClass.custom}, .${HTMLClass.general}, .${HTMLClass.generalSymbol}`)) {
    let html_select = dropdown.getElementsByTagName("SELECT")[0] as HTMLSelectElement;

    if (html_select === undefined)
      continue;

    let selected = creators.createSelectedDiv(dropdown, html_select);
    let options = creators.createOptionsDiv(dropdown, html_select, selected);
    dropdown.appendChild(selected);
    dropdown.appendChild(options);

    selected.addEventListener("click", events.selectedClicked);
  }

  document.addEventListener("click", events.closeAllSelect);
}

main();