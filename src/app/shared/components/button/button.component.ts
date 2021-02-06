import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shared-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() className: { [Class: string]: boolean };
  @Input() isDisabled: boolean;

  @Output() clicked = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent) {
    this.clicked.emit(event);
  }
}
