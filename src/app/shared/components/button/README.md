Usage example:

N1

```HTML
<app-shared-button
[className]="{'primary': true, 'active': true}"
style="width: 170px; height: 50px;"
[isDisabled]="boolean"
(clicked)="onClick(\$event)">active</app-shared-button>
```

```HTML
<app-shared-button
[className]="{'primary': true, 'resting': true}"
style="width: 170px; height: 50px;"
(clicked)="onClick(\$event)">resting</app-shared-button>
```

```HTML
<app-shared-button
[className]="{'blue': true}"
style="width: 180px; height: 50px;"
(clicked)="onClick(\$event)">active</app-shared-button>
```

N2 (with icon)

```HTML
<app-shared-button
[className]="{'outline': true, 'resting': true}"
style="width: 200px; height: 50px;"
(clicked)="onClick(\$event)"><i class="lar la-heart icon"></i>resting</app-shared-button>
```

Select your desired class name, write **width** and **height** (optional), select whether the button is disabled or not (optional, the button is active by default), write the button text and add an icon if you need.

**Class names**: "primary active", "primary resting", "outline active", "outline resting", "blue", "green", "pink", "lightBlue".
