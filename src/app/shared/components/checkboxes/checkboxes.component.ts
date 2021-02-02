import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.scss'],
})
export class CheckboxesComponent implements OnInit {
  @Input() checkboxType = 'uncheck';
  @Input() checked = false;
  @Input() disabled = false;
  @Input() checkboxError = '';
  constructor() {}

  ngOnInit(): void {}
}
