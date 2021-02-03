import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shared-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  @Input() text: string;
  @Input() className: string;

  constructor() {}

  ngOnInit(): void {}
}
