import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { ArkCoreComponent } from './ark-core/ark-core.component';

import { HttpClientModule } from '@angular/common/http';
import { ArkManagerComponent } from './ark-manager/ark-manager.component';
import { ArkCreateComponent } from './ark-create/ark-create.component';
import { ArkDetailsComponent } from './ark-details/ark-details.component';
import { ArkSessionsComponent } from './ark-sessions/ark-sessions.component';
import { Tabs } from './tabs/tabs.component';
import { Tab } from './tab/tab.component';

@NgModule({
  declarations: [
    AppComponent,
    ArkCoreComponent,
    ArkManagerComponent,
    ArkCreateComponent,
    ArkDetailsComponent,
    ArkSessionsComponent,
    Tabs,
    Tab
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
