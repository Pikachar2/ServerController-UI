import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ArkService } from '../ark.service';
import { ArkSession } from '../ArkSession';

@Component({
  selector: 'app-ark-details',
  templateUrl: './ark-details.component.html',
  styleUrls: ['./ark-details.component.css']
})
export class ArkDetailsComponent implements OnInit {
  @Input() selectedSession: ArkSession;
  @Input() isOffline: Boolean = false;
  @Output() statusChangeEmitter = new EventEmitter<void>();

  sessionStatus: String = "Offline";
  isRunning: Boolean = false;

  editConfig: Boolean = false;
  gusConfigData: String;
  gameConfigData: String;

  gusFileName: String = 'GameUserSettings';
  gameFileName: String = 'Game';

  mapName: String;
  maps: String[];

  constructor(private arkService: ArkService) { }

  ngOnInit(): void {
    this.selectedSession = { sessionName: '', mapNames: [] };
    this.getMaps();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selectedSession = changes.selectedSession.currentValue;
    this.mapName = this.selectedSession.mapNames[0];
  }

  startSession(): void {
    this.sessionStatus = 'Starting...';
    this.isRunning = true;
    this.arkService.startSession(this.selectedSession.sessionName, this.mapName)
      .subscribe(response => {
      });
    console.log('before first emit');
    this.statusChangeEmitter.emit();
  }

  saveAndExportSession(): void {
    this.sessionStatus = 'Saving...';
    this.arkService.saveAndExportSession()
      .subscribe(response => {
      });
    this.statusChangeEmitter.emit();
  }

  saveAndExitSession(): void {
    this.sessionStatus = 'Saving and preparing to stop...';
    this.arkService.saveAndStopSession()
      .subscribe(response => {
        this.isRunning = false;
      });
    this.statusChangeEmitter.emit();
  }

  getConfigData() {
    this.editConfig = !this.editConfig;
    this.getGusConfig(this.gusFileName);
    this.getGameConfig(this.gameFileName);
    this.statusChangeEmitter.emit();
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
    this.statusChangeEmitter.emit();
  }

  getMaps(): void {
    this.arkService.getMaps()
      .subscribe(maps => {
        this.maps = maps;
        this.mapName = this.selectedSession.mapNames[0];
        console.log('got maps');
        console.log(maps);
      });
  }

  isSessionNameEmpty(): Boolean {
    return (!this.selectedSession.sessionName || 0 === this.selectedSession.sessionName.length);
  }

}
