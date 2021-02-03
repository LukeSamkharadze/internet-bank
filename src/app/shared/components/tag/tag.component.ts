import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shared-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent {
  @Input() color: string;
  @Output() closeClicked = new EventEmitter();

  close(event: MouseEvent) {
    this.closeClicked.emit(event);
  }
}
