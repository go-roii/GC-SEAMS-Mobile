import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Tabs2Page } from './tabs2.page';

const routes: Routes = [
  {
    path: '',
    component: Tabs2Page,
    children: [
      {
        path: 'my-events',
        loadChildren: () => import('./my-events/my-events.module').then(m => m.MyEventsPageModule)
      },
      {
        path: 'all-events',
        loadChildren: () => import('./all-events/all-events.module').then(m => m.AllEventsPageModule)
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
