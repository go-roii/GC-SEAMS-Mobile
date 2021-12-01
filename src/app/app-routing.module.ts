import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.page.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'homescreen',
    loadChildren: () => import('./homescreen/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
      path: 'homescreen/tab1/event-details',
      loadChildren: () => import('./homescreen/event-details/event-details.module').then(m => m.EventDetailsPageModule)
  },
  {
    path: 'homescreen/tab2/event-details',
    loadChildren: () => import('./homescreen/event-details/event-details.module').then(m => m.EventDetailsPageModule)
  },
  {
    path: 'homescreen/tab3/event-details',
    loadChildren: () => import('./homescreen/event-details/event-details.module').then(m => m.EventDetailsPageModule)
  },
  {
    path: 'scan-qr-modal',
    loadChildren: () => import('./homescreen/scan-qr-modal/scan-qr-modal.module').then( m => m.ScanQrModalPageModule)
  },
  {
    path: 'event-details',
    loadChildren: () => import('./homescreen/event-details/event-details.module').then( m => m.EventDetailsPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
