import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { IDeposit } from '../../shared/interfaces/deposit.interface';
import { DepositService } from '../../shared/services/deposit.service';
import { FormatterService } from '../../shared/services/formatter.service';
import IButton from '../models/card-view-buttons.entity';
import ICardTemplate from '../models/card-view-card.entity';
import IList from '../models/card-view-list.entity';
import { ToListFormatterService } from '../services/to-list-formatter.service';
import { ToTemplateFormatterService } from '../services/to-template-formatter.service';

@Component({
  selector: 'app-deposit-details',
  templateUrl: './deposit-details.component.html',
  styleUrls: ['./deposit-details.component.scss'],
})
export class DepositDetailsComponent implements OnInit {
  cardInfo$: Observable<ICardTemplate>;
  list$: Observable<IList>;
  name$: Observable<string>;
  amount$: Observable<string>;
  icon$: Observable<string>;
  color$: Observable<string>;
  buttons$: Observable<IButton[]>;

  constructor(
    private formatterService: FormatterService,
    private toListService: ToListFormatterService,
    private toTemplateService: ToTemplateFormatterService,
    private depositService: DepositService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const deposit$ = this.route.params.pipe(
      map((params) => Number(params.id)),
      map((id) => {
        if (isNaN(id)) {
          throw new Error();
        }
        return this.depositService.getById(id);
      }),
      filter((v) => !!v),
      switchMap((v) => v)
    );
    this.initializeDeposit(deposit$);
  }

  initializeDeposit(deposit$: Observable<IDeposit>): void {
    this.color$ = deposit$.pipe(
      map((deposit) => this.depositService.determineColor(deposit))
    );
    this.icon$ = deposit$.pipe(
      map((deposit) => this.depositService.determineIcon(deposit))
    );
    this.name$ = deposit$.pipe(map((v) => v.depositName));
    this.amount$ = deposit$.pipe(
      map((deposit) =>
        this.formatterService.formatBalance(deposit.balance || 0, {
          currency: '$',
          toFixed: 2,
        })
      )
    );
    this.list$ = deposit$.pipe(
      map((deposit) => this.toListService.depositToList(deposit))
    );
    this.cardInfo$ = deposit$.pipe(
      map((deposit) => this.toTemplateService.depositToTemplate(deposit))
    );
    this.buttons$ = deposit$.pipe(
      map((deposit) => [
        {
          text: 'DELETE',
          function: () => this.depositService.delete(deposit.id),
          callBack: this.navigateToProducts.bind(this),
        },
      ])
    );
  }

  navigateToProducts() {
    this.router.navigateByUrl('/accounts-list');
  }
}
