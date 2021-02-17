import {
  Component,
  ContentChild,
  ContentChildren,
  forwardRef,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-shared-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  // tabStyle: string;
  activeTab: string;
  @Input() tabElementInput: string[] = [];
  // @Input() tabComponentInput: string[] = [];
  @ContentChildren(TemplateRef) itemTemplate: TemplateRef<any>[];
  tabIndex: number;

  ngOnInit(): void {}
  changeTabStyle(tabName) {
    return this.tabIsActive(tabName) ? 'active tabname' : 'tabname';
  }
  changeLineStyle(tabName) {
    return this.tabIsActive(tabName)
      ? 'lineActive lineanimation'
      : 'lineanimation';
  }
  tabIsActive(tabName) {
    return tabName === this.activeTab;
  }

  clickTab(tab) {
    this.activeTab = tab;
  }
}
