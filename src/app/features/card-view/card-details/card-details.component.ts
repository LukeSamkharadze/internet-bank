import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  Subject,
  throwError,
} from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { ICard } from '../../shared/interfaces/card.interface';
import { CardService } from '../../shared/services/card.service';
import { FormatterService } from '../../shared/services/formatter.service';
import IButton from '../models/card-view-buttons.interface';
import ICardTemplate from '../models/card-view-card.interface';
import IList from '../models/card-view-list.interface';
import { ListFormatService } from '../services/list-format.service';
import { TemplateFormatService } from '../services/template-format.service';
import { SocketIoService } from '../../shared/services/socket-io.service';
import { NotificationsManagerService } from 'src/app/shared/services/notifications-manager.service';
import { NotificationItem } from 'src/app/shared/entity/notificationItem';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['../_base.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDetailsComponent implements OnInit, OnDestroy {
  private unscubscriber = new Subject();
  cardInfo$: Observable<ICardTemplate>;
  list$: Observable<IList>;
  icon$: Observable<string>;
  logo$: Observable<string>;
  name$: Observable<string>;
  amount$: Observable<string>;
  buttons$: Observable<IButton[]>;
  background$: Observable<string>;
  canSelect$: BehaviorSubject<boolean>;
  accountNumber$: Observable<string>;

  private paramsCard$: Observable<ICard>;

  constructor(
    private formatterService: FormatterService,
    private toListService: ListFormatService,
    private toTemplateService: TemplateFormatService,
    private cardService: CardService,
    private route: ActivatedRoute,
    private router: Router,
    private socketIo: SocketIoService,
    private changeDetectorRef: ChangeDetectorRef,
    private notificationsService: NotificationsManagerService
  ) {}

  ngOnInit(): void {
    this.canSelect$ = new BehaviorSubject(false);
    this.paramsCard$ = this.route.params.pipe(
      map((params) => Number(params.id)),
      map((id) => {
        if (isNaN(id)) {
          throw new Error();
        }
        return this.cardService.getById(id);
      }),
      filter((card$) => !!card$),
      switchMap((v) => v)
    );
    this.initializeCard(this.paramsCard$);

    this.socketIo
      .listen('transaction')
      .pipe(
        takeUntil(this.unscubscriber),
        tap(() => {
          this.initializeCard(this.paramsCard$);
          this.changeDetectorRef.detectChanges();
        })
      )
      .subscribe();
  }

  initializeCard(card$: Observable<ICard>): void {
    this.accountNumber$ = card$.pipe(map((card) => card.accountNumber));
    this.background$ = card$.pipe(
      map((card) => this.cardService.determineBackground(card))
    );
    this.icon$ = card$.pipe(map((card) => card.iconPath));
    this.logo$ = card$.pipe(map((card) => card.iconPath));
    this.buttons$ = this.determineButtons(card$);
    this.name$ = card$.pipe(
      map((card) => this.formatterService.cardNumberHideMiddle(card.cardNumber))
    );
    this.amount$ = card$.pipe(
      map((card) =>
        this.formatterService.formatBalance(
          card.balance || card.availableAmount || 0,
          { currency: '$', toFixed: 2 }
        )
      )
    );
    this.list$ = card$.pipe(map((card) => this.toListService.cardToList(card)));
    this.cardInfo$ = card$.pipe(
      map((card) => this.toTemplateService.cardToTemplate(card)),
      tap(() => setTimeout(() => this.canSelect$.next(true), 500))
    );
  }

  navigateToProducts() {
    this.router.navigateByUrl('/accounts-list');
  }

  determineButtons(card$: Observable<ICard>): Observable<IButton[]> {
    return combineLatest([
      this.getDeleteButton(card$),
      this.getBlockButton(card$),
    ]);
  }

  getBlockButton(card$: Observable<ICard>): Observable<IButton> {
    const updatedCard$ = new Subject<ICard>();
    const blockButton$: Observable<IButton> = merge(card$, updatedCard$).pipe(
      map(
        (card) =>
          ({
            text: card.blocked ? 'UNBLOCK' : 'BLOCK',
            function: () => {
              const newCard$ = this.cardService.update({
                ...card,
                blocked: !card.blocked,
              });
              newCard$.subscribe(
                (newCard) => {
                  this.notificationsService.add(
                    new NotificationItem(
                      `Your card was successfully ${
                        card.blocked ? 'unblocked' : 'blocked'
                      }`,
                      'success'
                    )
                  );
                  updatedCard$.next(newCard);
                },
                () =>
                  this.notificationsService.add(
                    new NotificationItem(
                      `Your card wasn't ${
                        card.blocked ? 'unblocked' : 'blocked'
                      }. Please try again!`,
                      'failure'
                    )
                  )
              );
              return newCard$;
            },
          } as IButton)
      )
    );

    return blockButton$;
  }

  getDeleteButton(card$: Observable<ICard>): Observable<IButton> {
    return card$.pipe(
      map((card) => ({
        text: 'DELETE',
        function: () =>
          this.cardService.delete(card.id).pipe(
            catchError((err) => {
              this.notificationsService.add(
                new NotificationItem(
                  'Your card wasn`t deleted. Please try again!',
                  'failure'
                )
              );
              return throwError(err);
            })
          ),
        callBack: function callback() {
          this.notificationsService.add(
            new NotificationItem(
              'Your card was successfully deleted',
              'success'
            )
          );
          this.navigateToProducts();
        }.bind(this),
      }))
    );
  }

  ngOnDestroy() {
    this.unscubscriber.next();
  }
}
