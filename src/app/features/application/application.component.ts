import { Component, OnInit } from '@angular/core';
import { CardService } from '../shared/services/card.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cardService.updateStore();
  }
}
