/* eslint-disable */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {QRScanner} from "@ionic-native/qr-scanner/ngx";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, QRScanner],
  bootstrap: [AppComponent],
})
export class AppModule {}
