import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlternativeCodePageRoutingModule } from './alternative-code-routing.module';

import { AlternativeCodePage } from './alternative-code.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AlternativeCodePageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [AlternativeCodePage]
})
export class AlternativeCodePageModule {}
