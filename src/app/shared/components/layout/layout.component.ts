import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CardService } from '../../../features/shared/services/card.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shared-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  public menuIsActive = false;
  public contentTitlte = 'DASHBOARD';
  public cardArray: Array<string> = [];
  public cardTypeArray: Array<string> = [];
  public contentMainHeight;
  private subscription: Subscription;

  @ViewChild('mainNav')
  mainNav: ElementRef;

  @ViewChild('bottomNav')
  bottomNav: ElementRef;

  @ViewChild('contentMain')
  contentMain: ElementRef;

  constructor(private cardService: CardService, private router: Router) {}
  redirectToDashboard() {
    this.contentTitlte = 'DASHBOARD';
    this.router.navigate(['/dashboard']);
  }
  getMainContentMinHeight() {
    setTimeout(() => {
      if (this.cardArray.length === 0) {
        this.contentMainHeight =
          this.mainNav.nativeElement.offsetHeight + 100 + 'px';
      } else {
        this.contentMainHeight =
          this.mainNav.nativeElement.offsetHeight +
          this.bottomNav.nativeElement.offsetHeight +
          'px';
      }
    });
  }
  ngOnInit() {
    this.subscription = this.cardService.cards$.subscribe((response) => {
      this.cardArray = [];
      for (const card of response) {
        const cardNum = card.cardNumber.toString();
        this.cardArray.push(cardNum.slice(-4));
        this.cardTypeArray.push(card.cardType);
      }
      this.getMainContentMinHeight();
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
