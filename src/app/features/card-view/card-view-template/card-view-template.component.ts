import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import ICardTemplate from '../models/card-view-card.entity';
import IList from '../models/card-view-list.entity';

@Component({
  selector: 'app-card-view-template',
  templateUrl: './card-view-template.component.html',
  styleUrls: ['./card-view-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardViewTemplateComponent {
  @Input() list$: Observable<IList>;
  @Input() cardInfo$: Observable<ICardTemplate>;
  @Input() name$: Observable<string>;
  @Input() amount$: Observable<string>;
  @Input() canBlock: boolean;
  @Input() color$: Observable<string>;
  @Input() cardColor: string;
}
