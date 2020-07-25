import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  constructor(private arkService: ArkService) { }

  ngOnInit(): void {
  }

  createAndStartSession(): void {
    this.arkService.createAndStartSession(this.sessionName, this.mapName)
      .subscribe(response => { 
        var selectedSession:ArkSession = {mapNames:[this.mapName], sessionName:this.sessionName };
        console.log(selectedSession);
        this.selectedSessionEmitter.emit(selectedSession);
      });
  }

}
