import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-shared-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => {}),
    },
  ],
})
export class TabsComponent implements OnInit {
  isClicked: boolean[];
  // tabElements: string[];
  // input: string[];
  @Input() tabElementInput: string[] = [];
  @Input() tabComponentInput: string[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log(this.tabElementInput);
    // this.tabElements = ['Latest News', 'Most Popular', 'Trending News'];
    // this.input = ['hello there', 'lorem ipsum', 'Lorem ipsum dolor sit amet'];
    this.isClicked = new Array(this.tabElementInput.length);
  }
  clickTab(index) {
    for (let i = 0; i < this.isClicked.length; i++) {
      if (i === index) {
        this.isClicked[i] = true;
      } else {
        this.isClicked[i] = false;
      }
    }
  }
}
