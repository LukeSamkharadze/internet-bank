import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-deactivate',
  templateUrl: './deactivate.component.html',
  styleUrls: ['./deactivate.component.scss'],
})
export class DeactivateComponent implements OnInit {
  @Output() closeAccount = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}
}
