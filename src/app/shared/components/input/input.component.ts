import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-shared-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() control: FormControl;
  @Input() caption = '';
  @Input() type = 'text';
  @Input() placeholder = 'Placeholder';
  @Input() validated = true;

  constructor() {}

  ngOnInit(): void {}
}
