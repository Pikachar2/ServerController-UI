import { Component, OnInit } from '@angular/core';
import { Tab } from '../tab/tab.component';

@Component({
  selector: 'tabs',
  template: `
    <ul class="tabs">
      <li *ngFor="let tab of tabs" (click)="selectTab(tab)">
        <span class="badge">{{tab.tabTitle}}</span>
      </li>
    </ul>
    <ng-content></ng-content>
  `,
  styleUrls: ['./tabs.component.css']
})
export class Tabs {
  tabs: Tab[] = [];

  selectTab(tab: Tab) {
    this.tabs.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true;
  }

  addTab(tab: Tab) {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }
}