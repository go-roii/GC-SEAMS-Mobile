import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyEventsPageRoutingModule } from './my-events-routing.module';

import { MyEventsPage } from './my-events.page';
import { InvitedComponent } from './invited/invited.component';
import { RegisteredComponent } from './registered/registered.component';
import { AttendedComponent } from './attended/attended.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyEventsPageRoutingModule
  ],
  declarations: [
    MyEventsPage,
    InvitedComponent,
    RegisteredComponent,
    AttendedComponent
  ]
})
export class MyEventsPageModule {}
