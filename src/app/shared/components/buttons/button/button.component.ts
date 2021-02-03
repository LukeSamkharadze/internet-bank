import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  // @Input() className: string;

  @Input() primary: boolean;
  @Input() outline: boolean;
  @Input() active: boolean;
  @Input() resting: boolean;
  @Input() blue: boolean;
  @Input() green: boolean;
  @Input() pink: boolean;
  @Input() lightBlue: boolean;

  @Input() width: number;
  @Input() height: number;

  @Output() newItemEvent = new EventEmitter<object>();

  className = '';

  constructor() {}

  ngOnInit(): void {
    const styleClass = {
      primary: this.primary,
      outline: this.outline,
      active: this.active,
      resting: this.resting,
      blue: this.blue,
      green: this.green,
      pink: this.pink,
      lightBlue: this.lightBlue,
    };

    for (const key in styleClass) {
      if (styleClass[key] === true) {
        this.className += key + ' ';
      }
    }
  }

  onClick(event: object) {
    this.newItemEvent.emit(event);
  }
}
