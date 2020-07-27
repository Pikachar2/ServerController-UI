import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SessionStatus } from '../SessionStatus';
import { ArkSession } from '../ArkSession';

@Component({
  selector: 'app-ark-manager',
  templateUrl: './ark-manager.component.html',
  styleUrls: ['./ark-manager.component.css']
})
export class ArkManagerComponent implements OnInit {
  @Output() statusChangeEmitter = new EventEmitter<String>();
  @Input() isOffline: Boolean = false;
  isRunning: Boolean = false;
  selectedSession: ArkSession;
  constructor() { }

  ngOnInit(): void {
  }

  statusUpdateEvent(statusChange: SessionStatus) {
    this.isRunning = statusChange.isRunning;
    console.log('startSession' + statusChange);
    this.statusChangeEmitter.emit(statusChange.statusMessage);
  }

  listItemSelected(selectedSession: ArkSession) {
    console.log('ark-manager.listItemSelected');
    console.log(selectedSession);
    this.selectedSession = selectedSession;
    //TODO: make sure to hide createSession
  }
}
