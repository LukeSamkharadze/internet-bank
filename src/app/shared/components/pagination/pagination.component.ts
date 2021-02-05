import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shared-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() count = 100;
  @Input() itemsPerPage = 10;
  @Output() changePage = new EventEmitter();
  current;
  collection = { count: this.count, data: [] };
  config = {
    id: 'custom',
    itemsPerPage: this.itemsPerPage,
    currentPage: 1,
    totalItems: this.collection.count,
  };

  constructor() {
    for (let i = 0; i < this.collection.count; i++) {
      this.collection.data.push({
        id: ' ',
        value: ' ',
      });
    }
  }
  pageChange(event) {
    this.current = this.config.currentPage;
    this.changePage.emit(this.current);
  }
}
