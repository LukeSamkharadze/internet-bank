import { Component, OnInit } from '@angular/core';
import { CardService } from '../shared/services/card.service';
import { DepositService } from '../shared/services/deposit.service';
import { LoanService } from '../shared/services/loan.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
  constructor(
    private cardService: CardService,
    private depositService: DepositService,
    private loanService: LoanService
  ) {}

  ngOnInit(): void {
    this.cardService.updateStore();
    this.depositService.updateStore();
    this.loanService.updateStore();
  }
}
