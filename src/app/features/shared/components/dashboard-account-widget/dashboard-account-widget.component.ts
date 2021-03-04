import { Component, OnInit, Input } from '@angular/core';
import { ICard } from '../../interfaces/card.interface';
import { CalculateProfitService } from './calculate-profit.service';
import { GetCardServiceService } from './get-card-service.service';
import { Income } from './income';

@Component({
  selector: 'app-shared-dashboard-account-widget',
  providers: [GetCardServiceService, CalculateProfitService],
  templateUrl: './dashboard-account-widget.component.html',
  styleUrls: ['./dashboard-account-widget.component.scss'],
})
export class DashboardAccountWidgetComponent implements OnInit {
  income = 0;
  outcome = 0;
  percentage: number;
  degreeSecondHalf: number;
  degreeFirstHalf: number;
  profit: number;
  showIcons: boolean;
  profitRound: string;
  styleElement: any;
  animation: string;
  cards: ICard[];
  i: number;
  shownCard: ICard;
  largest = 0;
  card: ICard;
  incomeOutcome: Income[];
  constructor(
    public getCardService: GetCardServiceService,
    public calculateProfit: CalculateProfitService
  ) {}

  calculateProfitRound() {
    if (this.income > 999 && this.outcome > 999 && this.income > this.outcome) {
      this.profit = this.income - this.outcome;
      this.profitRound = (this.profit / 1000).toFixed(0) + 'K';
    } else if (this.income < this.outcome) {
      this.profitRound = '0K';
    } else if (
      this.income < 999 &&
      this.outcome < 999 &&
      this.income > this.outcome
    ) {
      this.profit = this.income - this.outcome;
      this.profitRound = this.profit.toString();
    }
  }
  getIncome() {
    this.calculateProfit.getAll().subscribe((resp) => {
      this.incomeOutcome = resp;
      const incomeArray = this.incomeOutcome[0].data;
      const outcomeArray = this.incomeOutcome[1].data;
      for (this.i = 0; this.i < incomeArray.length; this.i++) {
        this.income = this.income + incomeArray[this.i];
      }
      for (this.i = 0; this.i < incomeArray.length; this.i++) {
        this.outcome = this.outcome + outcomeArray[this.i];
      }
      this.calculateProfitRound();
      this.calculateDegree();
      this.styleElement = document.createElement('style');
      this.styleElement.type = 'text/css';
      this.styleElement.textContent = this.animation;
      document.head.appendChild(this.styleElement);
    });
  }
  calculateDegree() {
    if (this.profit > 0) {
      this.percentage = (this.profit / this.income) * 100;
      if (this.percentage < 50) {
        this.degreeFirstHalf = (this.percentage / 100) * 180;
        this.animation =
          '@keyframes loading-1 {0% {-webkit-transform: rotate(0deg);' +
          'transform: rotate(0deg)}100% {-webkit-transform: rotate(180deg);' +
          'transform: rotate(' +
          this.degreeFirstHalf.toString() +
          'deg)}}';
      } else if (this.percentage === 50) {
        this.degreeFirstHalf = 180;
        this.animation =
          '@keyframes loading-1 {0% {-webkit-transform: rotate(0deg);' +
          'transform: rotate(0deg)}100% {-webkit-transform: rotate(180deg);' +
          'transform: rotate(' +
          this.degreeFirstHalf.toString() +
          'deg)}}';
      } else {
        this.degreeFirstHalf = 180;
        this.degreeSecondHalf = ((this.percentage - 50) * 360) / 100;
        this.animation =
          '@keyframes loading-1 {0% {-webkit-transform: rotate(0deg);' +
          'transform: rotate(0deg)}100% {-webkit-transform: rotate(180deg);' +
          'transform: rotate(' +
          this.degreeFirstHalf.toString() +
          'deg)}}' +
          '@keyframes loading-2 {0% {-webkit-transform: rotate(0deg);' +
          'transform: rotate(0deg)}100% {-webkit-transform: rotate(180deg);' +
          'transform: rotate(' +
          this.degreeSecondHalf.toString() +
          'deg)}}';
      }
    }
  }
  switchRight() {
    this.getCardService.getCards().subscribe((v) => {
      if (this.i < v.length - 1) {
        this.i++;
      } else {
        this.i = 0;
      }
    });
  }
  switchLeft() {
    if (this.i > 0) {
      this.i--;
    }
  }
  activeCard() {
    this.getCardService.getCards().subscribe((v) => {
      this.cards = v;
      if (this.cards.length > 0) {
        this.shownCard = this.cards.reduce((prev, current) => {
          return prev.availableAmount > current.availableAmount
            ? prev
            : current;
        });
        this.i = this.cards.indexOf(this.shownCard);
        if (this.cards.length > 1) {
          this.showIcons = true;
        }
      }
    });
  }
  ngOnInit(): void {
    this.getIncome();
    this.activeCard();
  }
}
