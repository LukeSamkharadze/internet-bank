import { Component, OnInit, Input } from '@angular/core';
import { ICard } from '../../interfaces/card.interface';
import { GetCardServiceService } from './get-card-service.service';

@Component({
  selector: 'app-shared-dashboard-account-widget',
  providers: [GetCardServiceService],
  templateUrl: './dashboard-account-widget.component.html',
  styleUrls: ['./dashboard-account-widget.component.scss'],
})
export class DashboardAccountWidgetComponent implements OnInit {
  @Input() income = 0;
  @Input() outcome = 0;
  percentage: number;
  degreeSecondHalf: number;
  degreeFirstHalf: number;
  profit: number;
  profitRound: string;
  styleElement: any;
  animation: string;
  cards: ICard[];
  i: number;

  constructor(public getCardService: GetCardServiceService) {}

  calculateProfit() {
    if (this.income > 999 && this.outcome > 999 && this.income > this.outcome) {
      this.profit = this.income - this.outcome;
      this.profitRound = (this.profit / 1000).toFixed(0) + 'K';
      console.log(this.profitRound);
    } else if (this.income < this.outcome) {
      this.profitRound = '0';
      console.log(this.profitRound);
    } else if (
      this.income < 999 &&
      this.outcome < 999 &&
      this.income > this.outcome
    ) {
      this.profit = this.income - this.outcome;
      this.profitRound = this.profit.toString();
    }
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

  ngOnInit(): void {
    this.getCardService.getCards().subscribe((v) => (this.cards = v));
    this.calculateProfit();
    this.calculateDegree();
    this.styleElement = document.createElement('style');
    this.styleElement.type = 'text/css';
    this.styleElement.textContent = this.animation;
    document.head.appendChild(this.styleElement);
  }
}
