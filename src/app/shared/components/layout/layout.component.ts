import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-shared-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements AfterViewInit {
  menuIsActive = false;
  contentMainHeight;

  @ViewChild('mainNav')
  mainNav: ElementRef;

  @ViewChild('bottomNav')
  bottomNav: ElementRef;

  @ViewChild('contentMain')
  contentMain: ElementRef;

  constructor() {}
  ngAfterViewInit() {
    setTimeout(() => {
      this.contentMainHeight =
        this.mainNav.nativeElement.offsetHeight +
        this.bottomNav.nativeElement.offsetHeight +
        'px';
    });
  }
}
