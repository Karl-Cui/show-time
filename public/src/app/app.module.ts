import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { AdminUserListComponent } from './ui/admin-user-list/admin-user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  declarations: [ // Component, Directive, or Pipe
    AppComponent, AdminUserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiModule,
    HttpClientModule,
    HttpModule,
    CountdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
