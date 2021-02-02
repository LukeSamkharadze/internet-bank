import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.scss'],
})
export class CheckboxesComponent implements OnInit {
  @Input() checkboxType: string;
  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Input() checkboxError: string;
  @Input() checkboxText!: string;
  constructor() {}

  ngOnInit(): void {}
}
