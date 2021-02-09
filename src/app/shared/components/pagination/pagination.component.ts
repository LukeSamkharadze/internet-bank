import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
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

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
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
  pageChange(event) {
    this.current = this.config.currentPage;
    this.changePage.emit(this.current);
  }
}
