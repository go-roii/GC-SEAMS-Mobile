import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllEventsPageRoutingModule } from './all-events-routing.module';

import { AllEventsPage } from './all-events.page';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { OngoingComponent } from './ongoing/ongoing.component';
import { PastComponent } from './past/past.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllEventsPageRoutingModule
  ],
  declarations: [
    AllEventsPage,
    OngoingComponent,
    UpcomingComponent,
    PastComponent
  ]
})
export class AllEventsPageModule {}
