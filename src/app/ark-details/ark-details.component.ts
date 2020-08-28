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

  sessionStatus: String = "";
  buttonsEnabled: Boolean = true;

  editConfig: Boolean = false;
  gusConfigData: String;
  gameConfigData: String;

  gusFileName: String = 'GameUserSettings';
  gameFileName: String = 'Game';

  mapName: String;
  maps: String[];

  playerId: String;

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
    this.buttonsEnabled = false;
    this.arkService.startSession(this.selectedSession.sessionName, this.mapName)
      .subscribe(response => {
      });
    this.emitAndEnableButtons();
  }

  saveAndExportSession(): void {
    this.buttonsEnabled = false;
    this.arkService.saveAndExportSession()
      .subscribe(response => {
      });
    this.emitAndEnableButtons();
  }

  saveAndExitSession(): void {
    this.buttonsEnabled = false;
    this.arkService.saveAndStopSession()
      .subscribe(response => {
        this.statusChangeEmitter.emit();
      });
    this.emitAndEnableButtons();
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
    this.buttonsEnabled = false;
    this.sessionStatus = `Saving Config: ${configFileName}.ini...`;
    this.editConfig = !this.editConfig;
    this.arkService.saveConfig(this.selectedSession.sessionName, configData, configFileName)
      .subscribe(response => {
        this.sessionStatus = 'Config Saved!';
      });
    this.emitAndEnableButtons();
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

  emitAndEnableButtons() {
    this.statusChangeEmitter.emit();
    this.buttonsEnabled = true;
  }

  kickPlayer(): void {
    console.log('details: kickPlayer: playerId: ' + this.playerId);
    this.arkService.kickPlayer(this.playerId)
      .subscribe(response => {
        // TODO: STUB
        console.log('returned from kickPlayer');
      });
  }

}
