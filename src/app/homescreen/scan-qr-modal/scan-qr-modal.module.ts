import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanQrModalPageRoutingModule } from './scan-qr-modal-routing.module';

import { ScanQrModalPage } from './scan-qr-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanQrModalPageRoutingModule
  ],
  declarations: [ScanQrModalPage]
})
export class ScanQrModalPageModule {}
