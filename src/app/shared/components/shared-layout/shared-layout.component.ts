import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-shared-layout',
  templateUrl: './shared-layout.component.html',
  styleUrls: ['./shared-layout.component.scss'],
})
export class SharedLayoutComponent implements AfterViewInit {
  menuIsActive = false;
  contentMainHeight;

  @ViewChild('mainNav')
  mainNav: ElementRef;

  @ViewChild('bottomNav')
  bottomNav: ElementRef;

  constructor() {}
  ngAfterViewInit() {
    setTimeout(() => {
      this.contentMainHeight =
        this.mainNav.nativeElement.offsetHeight +
        this.bottomNav.nativeElement.offsetHeight +
        'px';
    }, 0);
  }
}
