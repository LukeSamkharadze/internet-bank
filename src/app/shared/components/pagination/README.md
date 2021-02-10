This component uses inputs
count - it shows total number of items
itemsPerPage - it shows number of items per page
currentPage - it shows which page will be loaded first

For example:
<app-shared-pagination
[count]="100"
[itemsPerPage]="10"
[currentPage]="3"

> </app-shared-pagination>

This component also has output which outputs current page;

<app-shared-pagination
(changePage)="changepage(\$event)"

> </app-shared-pagination>
