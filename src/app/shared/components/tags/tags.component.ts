import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shared-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  @Input() className: string;
  @Output() closeTag = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  close() {
    this.closeTag.emit();
  }
}
