import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tabs2PageRoutingModule } from './tabs2-routing.module';

import { Tabs2Page } from './tabs2.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tabs2PageRoutingModule,
    RouterModule
  ],
  declarations: [Tabs2Page]
})
export class Tabs2PageModule {}
