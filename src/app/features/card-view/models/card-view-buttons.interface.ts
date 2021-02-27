import { Observable } from 'rxjs';
import { ICard } from '../../shared/interfaces/card.interface';

export default interface IButton {
  text: string;
  function: () => Observable<void | ICard>;
  callBack?: () => void;
}
