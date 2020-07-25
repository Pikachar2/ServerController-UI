import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ArkService } from '../ark.service';
import { ArkSession } from '../ArkSession';

@Component({
  selector: 'app-ark-sessions',
  templateUrl: './ark-sessions.component.html',
  styleUrls: ['./ark-sessions.component.css']
})
export class ArkSessionsComponent implements OnInit {
  @Output() selectedSessionEmitter = new EventEmitter<ArkSession>();

  selectedSession: ArkSession;
  sessions: ArkSession[];

  constructor(private arkService: ArkService) { }

  ngOnInit(): void {
    this.getSessions();
  }

  getSessions(): void {
    this.arkService.getSessions()
    .subscribe(sessions => {
        this.sessions = sessions;
        console.log('got sessions');
        console.log(sessions);
    });
  }

  onSelect(session: ArkSession) {
    this.selectedSession = session;
    console.log(this.selectedSession);
    this.selectedSessionEmitter.emit(this.selectedSession);
  }

}
