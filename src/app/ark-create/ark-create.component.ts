import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ArkService } from '../ark.service';
import { ArkSession } from '../ArkSession';

@Component({
  selector: 'app-ark-create',
  templateUrl: './ark-create.component.html',
  styleUrls: ['./ark-create.component.css']
})
export class ArkCreateComponent implements OnInit {
  @Input() isOffline: Boolean = false;
  @Output() selectedSessionEmitter = new EventEmitter<ArkSession>();

  sessionName: String;
  mapName: String;
  maps: String[];

  validName: Boolean = false;

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

  validateSessionName(){
    console.log('things changed');
    const regex = new RegExp('^(\\w|-){1,30}$');
    var val: string = this.sessionName.valueOf();
    if(regex.test(val)){
      this.validName = true;
    } else {
      this.validName = false;
    }
  }

  isCreateButtonEnabled() {
    console.log('isCreateButtonEnabled');
    if(this.isOffline){
      return !this.validName;
    }
    return true;
  }

}
