import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Expanses } from '../../shared/interfaces/expanses.interface';
import { ILoan } from '../../shared/interfaces/loan.interface';
import { FormatterService } from '../../shared/services/formatter.service';
import { LoanService } from '../../shared/services/loan.service';
import IButton from '../models/card-view-buttons.interface';
import ICardTemplate from '../models/card-view-card.interface';
import IList from '../models/card-view-list.interface';
import { ListFormatService } from '../services/list-format.service';
import { TemplateFormatService } from '../services/template-format.service';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['../_base.scss'],
})
export class LoanDetailsComponent implements OnInit {
  cardInfo$: Observable<ICardTemplate>;
  list$: Observable<IList>;
  name$: Observable<string>;
  amount$: Observable<string>;
  icon$: Observable<string>;
  color$: Observable<string>;
  buttons$: Observable<IButton[]>;
  background$: Observable<string>;

  chartData$: Observable<Expanses[]>;

  constructor(
    private formatterService: FormatterService,
    private toListService: ListFormatService,
    private toTemplateService: TemplateFormatService,
    private loanService: LoanService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const loan$ = this.route.params.pipe(
      map((params) => Number(params.id)),
      map((id) => {
        if (isNaN(id)) {
          throw new Error();
        }
        return this.loanService.getById(id);
      }),
      filter((v) => !!v),
      switchMap((v) => v)
    );
    this.initializeLoan(loan$);
  }

  initializeLoan(loan$: Observable<ILoan>): void {
    this.chartData$ = loan$.pipe(
      map(
        (loan) =>
          [
            {
              kind: 'Amount',
              share: loan.balance || loan.paid || 0,
              colorString: '#FFAB2B',
            },
            {
              kind: 'Interest rate',
              share: loan.loanRate * (loan.balance || loan.paid || 0),
              colorString: '#4D7CFE',
            },
            {
              kind: 'Paid',
              share: loan.paid || 0,
              colorString: '#6DD230',
            },
          ] as Expanses[]
      )
    );
    this.color$ = loan$.pipe(map((v) => this.loanService.determineColor(v)));
    this.icon$ = loan$.pipe(map((v) => this.loanService.determineIcon(v)));
    this.name$ = loan$.pipe(map((v) => v.loanName));
    this.amount$ = loan$.pipe(
      map((v) =>
        this.formatterService.formatBalance(v.balance || v.paid || 0, {
          currency: '$',
          toFixed: 2,
        })
      )
    );
    this.background$ = loan$.pipe(
      map((loan) => this.loanService.determineBackground(loan))
    );
    this.list$ = loan$.pipe(map((v) => this.toListService.loanToList(v)));
    this.cardInfo$ = loan$.pipe(
      map((loan) => this.toTemplateService.loanToTemplate(loan))
    );
    this.buttons$ = loan$.pipe(
      map((loan) => [
        {
          text: 'DELETE',
          function: () => this.loanService.delete(loan.id),
          callBack: this.navigateToProducts.bind(this),
        },
      ])
    );
  }

  navigateToProducts() {
    this.router.navigateByUrl('/accounts-list');
  }
}
