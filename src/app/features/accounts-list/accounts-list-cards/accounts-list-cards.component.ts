import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICard } from '../../shared/interfaces/card.interface';
import IItem from '../models/list-item.interface';
import { AccountsListInfoService } from '../services/accounts-list-info.service';

@Component({
  selector: 'app-accounts-list-cards',
  templateUrl: './accounts-list-cards.component.html',
  styleUrls: ['../styles/_item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsListCardsComponent implements OnInit {
  @Input() cards$: Observable<ICard[]>;
  pipedCards$: Observable<
    (ICard | { color: string; icon: string; info: IItem })[]
  >;

  constructor(private infoService: AccountsListInfoService) {}

  ngOnInit(): void {
    this.pipedCards$ = this.cards$.pipe(
      map((cards) =>
        cards.map((card) => ({
          ...card,
          info: this.infoService.cardToInfo(card),
        }))
      )
    );
  }
}
