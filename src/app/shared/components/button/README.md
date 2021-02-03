გამოყენების გამალითი:

N1
<app-shared-button
[ngClass]="{'primary': true, 'active': true}"
[width]="100"
[height]="55"
(clicked)="onClick(\$event)">active
</app-shared-button>

<app-shared-button
[ngClass]="{'primary': true, 'resting': true}"
(clicked)="onClick(\$event)">resting
</app-shared-button>

<app-shared-button
[ngClass]="{'blue': true}"
(clicked)="onClick(\$event)">active
</app-shared-button>

N2 (with icon)

<app-shared-button
[ngClass]="{'primary': true, 'resting': true}"
[width]="90"
[height]="40"
(clicked)="onClick(\$event)">
<i class="lar la-heart icon"></i>resting
</app-shared-button>

ირჩევ სასურველ კლასს, უსაზღვრავ width და height-ს (ან default დაუტოვებ: height: 46px; width: 206px;), უწერ ღილაკს ტექსტს და
თუ წაჭიროა ამატებ აიქონს.

კლასების ვარიანტები: "primary active", "primary resting", "outline active", "outline resting", "blue", "green", "pink", "lightBlue". :)) ♥
