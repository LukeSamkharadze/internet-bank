import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import ICardTemplate from '../models/card-view-card.entity';
import IList from '../models/card-view-list.entity';

@Component({
  selector: 'app-card-view-template',
  templateUrl: './card-view-template.component.html',
  styleUrls: ['./card-view-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardViewTemplateComponent {
  @Input() list: IList;
  @Input() cardInfo: ICardTemplate;
  @Input() name: string;
  @Input() amount: string;
  @Input() canBlock: boolean;
}
