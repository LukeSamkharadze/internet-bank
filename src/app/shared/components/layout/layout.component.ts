import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { CardService } from '../../../features/shared/services/card.service';
@Component({
  selector: 'app-shared-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [CardService],
})
export class LayoutComponent implements OnInit, AfterViewInit {
  public menuIsActive = false;
  public contentTitlte = 'DASHBOARD';
  public cardArray: Array<string> = [];
  public cardNameArray: Array<string> = [];
  public contentMainHeight;

  @ViewChild('mainNav')
  mainNav: ElementRef;

  @ViewChild('bottomNav')
  bottomNav: ElementRef;

  @ViewChild('contentMain')
  contentMain: ElementRef;

  constructor(private cardService: CardService) {}

  ngOnInit() {
    this.cardService.getAll().subscribe((value) => {
      for (let card of value) {
        let cardNum = card.cardNumber.toString();
        this.cardArray.push(cardNum.slice(-4));
        this.cardNameArray.push(card.cardName);
      }
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.contentMainHeight =
        this.mainNav.nativeElement.offsetHeight +
        this.bottomNav.nativeElement.offsetHeight +
        'px';
    });
  }
}
