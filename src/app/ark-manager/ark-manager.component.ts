import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArkSession } from '../ArkSession';

@Component({
  selector: 'app-ark-manager',
  templateUrl: './ark-manager.component.html',
  styleUrls: ['./ark-manager.component.css']
})
export class ArkManagerComponent implements OnInit {
  @Output() statusChangeEmitter = new EventEmitter<void>();
  @Input() isOffline: Boolean = false;
  selectedSession: ArkSession;
  existingSessionNames: String[];
  constructor() { }

  ngOnInit(): void {
  }

  statusUpdateEvent(event?: any) {
    this.statusChangeEmitter.emit();
  }

  listItemSelected(selectedSession: ArkSession) {
    console.log('ark-manager.listItemSelected');
    console.log(selectedSession);
    this.selectedSession = selectedSession;
    //TODO: make sure to hide createSession
  }

  getSessionNames(list: String[]) {
    this.existingSessionNames = list;
  }
}
