გამოყენების გამალითი:

N1
<app-shared-button
[className]="{'primary': true, 'active': true}"
style="width: 170px; height: 50px;"
(clicked)="onClick(\$event)">active</app-shared-button>

<app-shared-button
[className]="{'primary': true, 'resting': true}"
style="width: 170px; height: 50px;"
(clicked)="onClick(\$event)">resting</app-shared-button>

<app-shared-button
[className]="{'blue': true}"
style="width: 180px; height: 50px;"
(clicked)="onClick(\$event)">active</app-shared-button>

N2 (with icon)

<app-shared-button
[className]="{'outline': true, 'resting': true}"
style="width: 200px; height: 50px;"
(clicked)="onClick(\$event)"><i class="lar la-heart icon"></i>resting</app-shared-button>

ირჩევ სასურველ კლასს, უსაზღვრავ width და height-ს უწერ ღილაკს ტექსტს და თუ წაჭიროა ამატებ აიქონს.

კლასების ვარიანტები: "primary active", "primary resting", "outline active", "outline resting", "blue", "green", "pink", "lightBlue". :)) ♥
