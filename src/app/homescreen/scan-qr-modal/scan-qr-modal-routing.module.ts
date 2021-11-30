import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanQrModalPage } from './scan-qr-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ScanQrModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanQrModalPageRoutingModule {}
