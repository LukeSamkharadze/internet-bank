import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-shared-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() count = 100;
  @Input() itemsPerPage = 10;
  @Input() currentPage = 1;
  @Output() changePage = new EventEmitter();
  config;
  current;
  collection;
  constructor() {
    // myItemsPerPage არის Input რომელსაც შენს კომპონენტს ვაწვდით
    setTimeout(() => {
      this.count = 50;
    }, 6000);
  }
  ngOnInit() {
    this.collection = { count: this.count, data: [] };
    this.config = {
      id: 'custom',
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.collection.count,
    };
    for (let i = 0; i < this.collection.count; i++) {
      this.collection.data.push({
        id: ' ',
        value: ' ',
      });
    }
  }
  ngOnChanges() {
    this.collection = { count: this.count, data: [] };
  }
  pageChange(event) {
    this.current = this.config.currentPage;
    this.changePage.emit(this.current);
  }
}
