import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlternativeCodePage } from './alternative-code.page';

const routes: Routes = [
  {
    path: '',
    component: AlternativeCodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlternativeCodePageRoutingModule {}
