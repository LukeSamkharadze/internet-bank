import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  public maxSize = 7;
  public directionLinks = true;
  public autoHide = false;
  public responsive = true;
  public labels: any = {
    previousLabel: '<--',
    nextLabel: '-->',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`,
  };
  collection = { count: 30, data: [] };
  config = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.collection.count,
  };
  ngOnInit(): void {}

  constructor() {
    for (let i = 0; i < this.collection.count; i++) {
      this.collection.data.push({
        id: ' ',
        value: ' ',
      });
    }
  }

  onPageChange(event) {
    console.log(event);
    this.config.currentPage = event;
  }
}
