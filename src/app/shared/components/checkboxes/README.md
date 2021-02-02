In order to get the desired type of checkbox you have to use property binding and give
Inputs:checkboxError(If u need red and green for unchecked and checked), and checkboxType string values "'someval'" like this.
If you need to have the input checked or disabled just assign "true" or "false" to it.
Possible values for checkboxType:uncheck, check, checkDisable, checkError,checkErrorCheck.
Only value for checkboxError is 'checkbox-error' that is a class. If you do not want to use any class, then just
assign an empty string to it "''"
