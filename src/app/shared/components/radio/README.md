You can use [(ngModel)] or `formControlName`, it's up to you, for Example :

<app-shared-radio OR <app-shared-radio  
 [buttons]="radioButtons" [buttons]="radioButtons"  
 [(ngModel)]="selectedRadio" formControlName="selectedRadio"
[disabled]=false [disabled]=false
[checkError]=false> [checkError]=false>
</app-shared-radio> </app-shared-radio>

1. [buttons]=`radioButtons` --> `radioButtons` is array with radio buttons, declare in your componenent for example:

radioButtons: RadioBtnType[] = [
{name: 'gender', value: 'male'},
{name: 'gender', value: 'female'},
] `add as many buttons as you want`

2. [disabled]=false `-->` button will be disabled

3. [(ngModel)]="selectedRadio" `-->` if you want button to be selected declare:
   selectedRadio = 'male' Or selectedRadio ='female' any `value` from `RadioBtnType` array

4. [checkError]=false> `-->`if there any error pass `true`, then button will be `red` and if user checks button it will be `green`;
