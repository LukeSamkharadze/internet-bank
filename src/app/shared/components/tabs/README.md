Pattern:
<app-shared-tabs [tabElementInput]="['News latest', 'Information ', 'About Us']"
[tabComponentInput] = "['first', 'second', 'third']">
<ng-template #first>
<p>Lorem Ipsum dolor sit amet</p>
<img src="" alt="image">

  </ng-template>

<ng-template #second>
<button> Hello </button>
</ng-template>

<ng-template #third>
<p>
Simple Text
</p>
</ng-template>
</app-shared-tabs>

--Create Array of Tab Names
-- Create ids for ng-template
-- Put your component in the ng-template
