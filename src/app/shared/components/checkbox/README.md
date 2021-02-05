!!!!It only works with FormControls!!!!!

If you want to have the label before checkbox input pass true to [textBefore]!!

If you want to have the input checked or disabled just assign "true" or "false" to it.
[required]=>true,false
[textBefore]=>true,false(dafault)
[checked]=> true,false(dafault),
[disabled]=>true,false(dafault),
[checkboxError]=>true, false(dafault), is used for showing errors when the checkbox is not checked;

For setting desired input name just enter the text <app-shared-checkboxes>sometext</app-shared-checkboxes>
By default:
textBefore =false;
checked = false;
disabled = false;
checkboxError = false;
