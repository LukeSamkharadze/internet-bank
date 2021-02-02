import { HTMLClass } from "./classes";
import * as events from "./events";
import * as creators from "./creators"

function main(): void {
  for (let dropdown of document.querySelectorAll(`.${HTMLClass.custom}, .${HTMLClass.general}, .${HTMLClass.generalSymbol}`)) {
    let html_select = dropdown.getElementsByTagName("select")[0];

    let selected = creators.createSelectedDiv(dropdown, html_select);
    let options = creators.createOptionsDiv(dropdown, html_select, selected);
    dropdown.appendChild(selected);
    dropdown.appendChild(options);

    selected.addEventListener("click", events.selectedClicked);
  }

  document.addEventListener("click", events.closeAllDropdowns);
}

main();