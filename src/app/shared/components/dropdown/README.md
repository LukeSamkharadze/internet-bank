## **Simple dropdowns**

You can use **reactive | template** driven forms

```HTML
  <app-shared-dropdown
    formControlName | ngModel
    placeholder="Placeholder"
    [options]="['Option 1','Option 2','Option 3']">
  </app-shared-dropdown>
```

Changing dropdown dimensions:

```HTML
  <app-shared-dropdown
    style="width: 500px; height: 100px;"
    ...>
  </app-shared-dropdown>
```

## **Custom dropdowns**

Passing custom arrow

```HTML
<ng-template #myTemplate >
  <i class="fas fa-car"></i>
</ng-template>
```

```HTML
  <app-shared-dropdown
    [arrowTemplate]="myArrow"
    ...>
  </app-shared-dropdown>
```

Create template you want to use for **option | selected | placeholder** and then pass via `Input`

```HTML
<!-- let-option is what you pass in options array -->
<ng-template #myTemplate let-option>
  <i class="fas fa-car"></i> {{ option }}
</ng-template>
```

You also have the ability to pass different templates for **option | selected | placeholder**

```HTML
<ng-template #myReverseTemplate let-option>
  {{ option }} <i class="fas fa-car"></i>
</ng-template>
```

If you dont pass custom template, dropdown will use default template which works only for `strings`

```HTML
  <app-shared-dropdown
    [placeholderTemplate]="myTemplate"
    [selectedTemplate]="myTemplate"
    [optionTemplate]="myReverseTemplate"
    ...>
  </app-shared-dropdown>
```

## **Passing Objects as Options**

Example for displaying complex `options` and just description in `selected`

```HTML
<ng-template #optionTemplate let-option>
  <img src="{{ option.imgURL }}"></img>
  <button (click)="__DO_SOMETHING__()">CLICK HERE</button>
  <p>{{ option.description }}</p>
</ng-template>

<ng-template #selectedTemplate let-option>
  <p>{{ option.description }}</p>
</ng-template>
```

```HTML
  <app-shared-dropdown
    placeholder="Please Select"
    [options]="__OPTIONS_ARRAY__"
    [selectedTemplate]="simpleTemplate"
    [optionTemplate]="complexTemplate"
    ...>
  </app-shared-dropdown>
```

In previouss example we could have also used complex `placeholder`

```HTML
  <app-shared-dropdown
    [placeholder]="__PLACEHOLDER_OBJECT__"
    [options]="__OPTIONS_ARRAY__"
    [placeholderTemplate]="myPlaceholderTemplate"
    [selectedTemplate]="mySelectedTemplate"
    [optionTemplate]="myOptionTemplate"
    ...>
  </app-shared-dropdown>
```

`More customizable dropdown will be written upon request`
