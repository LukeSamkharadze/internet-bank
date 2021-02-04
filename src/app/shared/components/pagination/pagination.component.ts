import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() count = 100;
  @Input() itemsPerPage = 10;
  @Output() changePage = new EventEmitter();

  public maxSize = 7;
  public directionLinks = true;
  public autoHide = false;
  public responsive = true;
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

  onPageChange(event) {
    this.config.currentPage = event;
    this.changePage.emit(this.config.currentPage);
  }
}
