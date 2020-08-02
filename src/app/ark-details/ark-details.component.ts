import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ArkService } from '../ark.service';
import { SessionStatus } from '../SessionStatus';
import { ArkSession } from '../ArkSession';
import { ArkSessionsComponent } from '../ark-sessions/ark-sessions.component';

@Component({
  selector: 'app-ark-details',
  templateUrl: './ark-details.component.html',
  styleUrls: ['./ark-details.component.css']
})
export class ArkDetailsComponent implements OnInit {
  @Input() selectedSession: ArkSession;
  @Input() isOffline: Boolean = false;

  sessionStatus: String = "Offline";
  isRunning: Boolean = false;

  editConfig: Boolean = false;
  gusConfigData: String;
  gameConfigData: String;

  gusFileName: String = 'GameUserSettings';
  gameFileName: String = 'Game';

  constructor(private arkService: ArkService) { }

  ngOnInit(): void {
    this.selectedSession = { sessionName: '', mapNames: [] };
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selectedSession = changes.selectedSession.currentValue;
  }

  startSession(): void {
    this.sessionStatus = 'Starting...';
    this.isRunning = true;
    this.arkService.startSession(this.selectedSession.sessionName)
      .subscribe(response => {
      });
  }

  saveAndExportSession(): void {
    this.sessionStatus = 'Saving...';
    this.arkService.saveAndExportSession()
      .subscribe(response => {
      });
  }

  saveAndExitSession(): void {
    this.sessionStatus = 'Saving and preparing to stop...';
    this.arkService.saveAndStopSession()
      .subscribe(response => {
        this.isRunning = false;
      });
  }

  getConfigData() {
    this.editConfig = !this.editConfig;
    this.getGusConfig(this.gusFileName);
    this.getGameConfig(this.gameFileName);
  }

  getGusConfig(configFileName: String): void {
    this.arkService.getConfig(this.selectedSession.sessionName, configFileName)
      .subscribe(response => {
        this.gusConfigData = response.configData;
      });
  }

  getGameConfig(configFileName: String): void {
    this.arkService.getConfig(this.selectedSession.sessionName, configFileName)
      .subscribe(response => {
        this.gameConfigData = response.configData;
      });
  }

  saveConfig(configFileName: String, configData: String): void {
    this.sessionStatus = `Saving Config: ${configFileName}.ini...`;
    this.editConfig = !this.editConfig;
    this.arkService.saveConfig(this.selectedSession.sessionName, configData, configFileName)
      .subscribe(response => {
        this.sessionStatus = 'Config Saved!';
      });
  }

  isSessionNameEmpty(): Boolean {
    return (!this.selectedSession.sessionName || 0 === this.selectedSession.sessionName.length);
  }

}
