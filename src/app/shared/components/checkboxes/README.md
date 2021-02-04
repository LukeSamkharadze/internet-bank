!!!!It only works with FormControls!!!!!
In order to get the desired type of checkbox you have to use property binding and give
Inputs:checkboxError(If u need red and green for unchecked and checked), and checkboxType string values, "'someval'", like this.

If you want to have the input checked or disabled just assign "true" or "false" to it.

Possible values for checkboxType:It can be any string of your choice, but make sure you use different strings for differnet checkboxes.

Only value for checkboxError is 'checkbox-error' that is a class. If you do not want to use any class, then just assign an empty string to it "''".
[checked]=> true,false,
[disabled]=>true,false,
[checkboxError]=>'checkbox-error' or '', is used for showing errors when the checkbox is not checked;

For setting desired input name just enter the text <app-shared-checkboxes>sometext</app-shared-checkboxes>
By default:
checkboxType = 'uncheck';
checked = false;
disabled = false;
checkboxError = '';
