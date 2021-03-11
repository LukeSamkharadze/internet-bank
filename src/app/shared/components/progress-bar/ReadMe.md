### Usage

---

<app-shared-progress-bar [value]="880" [max]="1200" [ascending]="false"></app-shared-progress-bar>

OR

<app-shared-progress-bar [value]="880" [max]="1200"></app-shared-progress-bar>

where **value** attribute is the amount of work that has been completed and **max** attribute is amount of work a specific task requires.
**ascending** is boolean, by default it has value **true** and in this case color of progress bar will change from red to green. And if [ascending]="false", color of progress bar will change from green to red.
