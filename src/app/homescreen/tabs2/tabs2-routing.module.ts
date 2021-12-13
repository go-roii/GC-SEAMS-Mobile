import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Tabs2Page } from './tabs2.page';
import {AuthGuard} from "../../guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: Tabs2Page,
    children: [
      {
        path: 'my-events',
        loadChildren: () => import('./my-events/my-events.module').then(m => m.MyEventsPageModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'all-events',
        loadChildren: () => import('./all-events/all-events.module').then(m => m.AllEventsPageModule),
        canLoad: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/homescreen/my-events',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/homescreen/my-events',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tabs2PageRoutingModule {}
