import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ArkService } from '../ark.service';

@Component({
  selector: 'app-ark-core',
  templateUrl: './ark-core.component.html',
  styleUrls: ['./ark-core.component.css']
})
export class ArkCoreComponent implements OnInit {

  serverStatus: String = '';
  isOffline: boolean = this.serverStatus == 'Server is OFFLINE';

  subscription: Subscription;


  constructor(private arkService: ArkService) { }

  ngOnInit(): void {
    this.getStatus();
    const source = interval(15000);
    this.subscription = source.subscribe(val => {
      this.getStatus();
    });
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

  getStatus(): void {
    this.arkService.getStatus().subscribe(serverStatus => {
      this.serverStatus = serverStatus.status;
      this.isOffline = this.serverStatus == 'Server is OFFLINE';
    });
  }

  updateArk(): void {
    this.serverStatus = 'Updating';
    this.arkService.updateArk().subscribe(response => { this.getStatus() });
  }

  statusChanged(statusChange: String) {
    this.serverStatus = statusChange;
    console.log('startSession' + statusChange);
  }

}
