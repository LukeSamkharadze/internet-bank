import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CardService } from '../../../features/shared/services/card.service';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../../../app-routing.module';
@Component({
  selector: 'app-shared-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [CardService],
})
export class LayoutComponent implements OnInit {
  public menuIsActive = false;
  public contentTitlte = 'DASHBOARD';
  public cardArray: Array<string> = [];
  public cardTypeArray: Array<string> = [];
  public contentMainHeight;

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
    this.cardService.subj.subscribe(() => {
      this.cardService.getAll().subscribe((response) => {
        this.cardArray = response.map((v) => {
          console.log(v);
          return v.cardNumber.toString().slice(-4);
        });
        this.cardTypeArray = response.map((v) => {
          console.log(v);
          return v.cardType;
        });
        this.getMainContentMinHeight();
      });
    });
    this.cardService.getAll().subscribe((response) => {
      for (const card of response) {
        const cardNum = card.cardNumber.toString();
        this.cardArray.push(cardNum.slice(-4));
        this.cardTypeArray.push(card.cardType);
      }
      this.getMainContentMinHeight();
    });
  }
}
