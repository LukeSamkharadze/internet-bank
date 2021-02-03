გამოყენების გამალითი:
N1
<app-button [primary] = "true" [active] = "true" [width]="100" [height]="55" (newItemEvent)="onClick($event)">active</app-button>
 N2 (with icon)
 <app-button [primary] = "true" [resting] = "true" [width]="200" [height]="50" (newItemEvent)="onClick($event)"><i class="lar la-heart icon"></i>resting</app-button>

ირჩევ სასურველ კლასს, უსაზღვრავ width და height-ს და უწერ ღილაკს ტექსტს.
ყველა ღილაკის მაგალითი buttons.component.html - შია. :)) ♥
