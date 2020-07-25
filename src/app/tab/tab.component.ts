import { Component, OnInit, Input } from '@angular/core';
import { Tabs } from '../tabs/tabs.component';

@Component({
  selector: 'tab',
  template: `
    <div [hidden]="!active">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./tab.component.css']
})
export class Tab {

  @Input() tabTitle: string;

  active:boolean

  constructor(tabs: Tabs) {
    tabs.addTab(this);
  }
}