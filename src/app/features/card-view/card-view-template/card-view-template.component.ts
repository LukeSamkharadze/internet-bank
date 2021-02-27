import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import IButton from '../models/card-view-buttons.interface';
import ICardTemplate from '../models/card-view-card.interface';
import IList from '../models/card-view-list.interface';

@Component({
  selector: 'app-card-view-template',
  templateUrl: './card-view-template.component.html',
  styleUrls: ['./card-view-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardViewTemplateComponent implements OnDestroy {
  @Input() list: IList;
  @Input() cardInfo: ICardTemplate;
  @Input() name: string;
  @Input() amount: string;
  @Input() canBlock: boolean;
  @Input() color: string;
  @Input() buttons: IButton[];
  @Input() background: string;

  private subscriptions: Array<Subscription> = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  subscribeFunction<T>(
    func: () => Observable<T>,
    callBack: () => void
  ): Subscription {
    const subscription = func().subscribe((v) => {
      if (typeof callBack === 'function') {
        callBack.call(this, v);
      }
    });
    this.subscriptions.push(subscription);
    return subscription;
  }
}
