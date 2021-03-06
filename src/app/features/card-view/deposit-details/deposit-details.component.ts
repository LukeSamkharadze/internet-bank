import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { NotificationItem } from 'src/app/shared/entity/notificationItem';
import { NotificationsManagerService } from 'src/app/shared/services/notifications-manager.service';
import { IDeposit } from '../../shared/interfaces/deposit.interface';
import { Expanses } from '../../shared/interfaces/expanses.interface';
import { DepositService } from '../../shared/services/deposit.service';
import { FormatterService } from '../../shared/services/formatter.service';
import IButton from '../models/card-view-buttons.interface';
import ICardTemplate from '../models/card-view-card.interface';
import IList from '../models/card-view-list.interface';
import { ListFormatService } from '../services/list-format.service';
import { TemplateFormatService } from '../services/template-format.service';

@Component({
  selector: 'app-deposit-details',
  templateUrl: './deposit-details.component.html',
  styleUrls: ['../_base.scss'],
})
export class DepositDetailsComponent implements OnInit {
  cardInfo$: Observable<ICardTemplate>;
  list$: Observable<IList>;
  name$: Observable<string>;
  amount$: Observable<string>;
  icon$: Observable<string>;
  color$: Observable<string>;
  buttons$: Observable<IButton[]>;
  background$: Observable<string>;
  canSelect$: BehaviorSubject<boolean>;

  chartData$: Observable<Expanses[]>;

  constructor(
    private formatterService: FormatterService,
    private toListService: ListFormatService,
    private toTemplateService: TemplateFormatService,
    private depositService: DepositService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationsService: NotificationsManagerService
  ) {}

  ngOnInit(): void {
    this.canSelect$ = new BehaviorSubject(false);
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
    this.chartData$ = deposit$.pipe(
      map(
        (deposit) =>
          [
            {
              kind: 'Available',
              share: deposit.balance || 0,
              colorString: '#FFAB2B',
            },
            {
              kind: 'Interest rate',
              share:
                deposit.depositRate * (deposit.balance || deposit.accured || 0),
              colorString: '#FE4D97',
            },
            {
              kind: 'Accured',
              share: deposit.accured || 0,
              colorString: '#6DD230',
            },
          ] as Expanses[]
      )
    );
    this.background$ = deposit$.pipe(
      map((deposit) => this.depositService.determineBackground(deposit))
    );
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
      map((deposit) => this.toTemplateService.depositToTemplate(deposit)),
      tap(() => setTimeout(() => this.canSelect$.next(true), 500))
    );
    this.buttons$ = deposit$.pipe(
      map((deposit) => [
        {
          text: 'DELETE',
          function: () =>
            this.depositService.delete(deposit.id).pipe(
              catchError((err) => {
                this.notificationsService.add(
                  new NotificationItem(
                    'Your deposit wasn`t deleted. Please try again!',
                    'failure'
                  )
                );
                return throwError(err);
              })
            ),
          callBack: function callback() {
            this.notificationsService.add(
              new NotificationItem(
                'Your deposit was successfully deleted',
                'success'
              )
            );
            this.navigateToProducts();
          }.bind(this),
        },
      ])
    );
  }

  navigateToProducts() {
    this.router.navigateByUrl('/accounts-list');
  }
}
