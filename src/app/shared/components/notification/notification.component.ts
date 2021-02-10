import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shared-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  @Input() color = 'white';
  @Output() closePopup = new EventEmitter();

  closeModal() {
    this.closePopup.emit();
    return true;
  }
}
