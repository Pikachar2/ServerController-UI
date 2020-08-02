import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ArkService } from '../ark.service';
import { ArkSession } from '../ArkSession';

@Component({
  selector: 'app-ark-create',
  templateUrl: './ark-create.component.html',
  styleUrls: ['./ark-create.component.css']
})
export class ArkCreateComponent implements OnInit {
  @Output() selectedSessionEmitter = new EventEmitter<ArkSession>();

  sessionName: String;
  mapName: String;
  maps: String[];

  constructor(private arkService: ArkService) { }

  ngOnInit(): void {
    this.getMaps();
  }

  createAndStartSession(): void {
    this.arkService.createAndStartSession(this.sessionName, this.mapName)
      .subscribe(response => {
        var selectedSession: ArkSession = { mapNames: [this.mapName], sessionName: this.sessionName };
        console.log(selectedSession);
        this.selectedSessionEmitter.emit(selectedSession);
      });
  }

  getMaps(): void {
    this.arkService.getMaps()
      .subscribe(maps => {
        this.maps = maps;
        this.mapName = this.maps[0];
        console.log('got maps');
        console.log(maps);
      });
  }

}
