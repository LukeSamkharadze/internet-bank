import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-shared-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  constructor() {}

  @Input() formControl: FormControl;
  @Input() optionsCount = 0;

  isOptionsOpened = true;

  ngOnInit(): void {}
}
