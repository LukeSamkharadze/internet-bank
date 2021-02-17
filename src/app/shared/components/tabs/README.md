Pattern:
<app-shared-tabs [tabElementInput]="['Latest News', 'Trending News', 'Most Popular' , 'Popular News' , 'Popular Hello']"

> <ng-template #first>

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
<ng-template #fourth>
  <p>
  Simple Text222
  </p>
  </ng-template>
  <ng-template #fifth>
    <div>
      <button disabled="disabled">Hello</button>
    </div>
  </ng-template>
</app-shared-tabs>

--Create Array of Tab Names
-- Create ids for ng-template
-- Put your component in the ng-template
