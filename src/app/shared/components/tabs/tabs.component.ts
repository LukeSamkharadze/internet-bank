import {
  Component,
  ContentChildren,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-shared-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  activeTab: string;
  @Input() tabElementInput: string[] = [];
  @ContentChildren(TemplateRef) itemTemplate: TemplateRef<any>[];
  tabIndex: number;

  ngOnInit(): void {
    this.clickTab(this.tabElementInput[0]);
    this.tabIndex = 0;
  }
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
