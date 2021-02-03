import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-shared-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() ngClass: { [Class: string]: boolean };

  @Input() width: number;
  @Input() height: number;

  @Output() clicked = new EventEmitter<object>();

  ngOnInit(): void {}

  onClick(event: object) {
    this.clicked.emit(event);
  }
}
