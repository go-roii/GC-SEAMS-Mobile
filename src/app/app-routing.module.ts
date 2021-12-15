import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {AutologinGuard} from './guards/autologin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.page.module').then(m => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
  },
  // {
  //   path: 'homescreen',
  //   loadChildren: () => import('./homescreen/tabs/tabs.module').then(m => m.TabsPageModule),
  // },
  // {
  //   path: 'homescreen/tab1/event-details/:uuid',
  //   loadChildren: () => import('./homescreen/event-details/event-details.module').then(m => m.EventDetailsPageModule)
  // },
  // {
  //   path: 'homescreen/tab2/event-details/:uuid',
  //   loadChildren: () => import('./homescreen/event-details/event-details.module').then(m => m.EventDetailsPageModule)
  // },
  // {
  //   path: 'homescreen/tab3/event-details/:uuid',
  //   loadChildren: () => import('./homescreen/event-details/event-details.module').then(m => m.EventDetailsPageModule)
  // },
  // {
  //   path: 'homescreen/tab4/event-details/:uuid',
  //   loadChildren: () => import('./homescreen/event-details/event-details.module').then(m => m.EventDetailsPageModule)
  // },



  {
    path: 'homescreen',
    loadChildren: () => import('./homescreen/tabs2/tabs2.module').then(m => m.Tabs2PageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'homescreen/my-events/:uuid/:disableRegistration',
    loadChildren: () => import('./homescreen/event-details/event-details.module').then(m => m.EventDetailsPageModule),
  },
  {
    path: 'homescreen/all-events/:uuid/:disableRegistration',
    loadChildren: () => import('./homescreen/event-details/event-details.module').then(m => m.EventDetailsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'scan-qr',
    loadChildren: () => import('./homescreen/scan-qr-modal/scan-qr-modal.module').then( m => m.ScanQrModalPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'homescreen/settings',
    loadChildren: () => import('./homescreen/settings/settings.module').then( m => m.SettingsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'alternative-code',
    loadChildren: () => import('./homescreen/alternative-code/alternative-code.module').then( m => m.AlternativeCodePageModule),
    canLoad: [AuthGuard]
  },



  // {
  //   path: 'event-details/:uuid',
  //   loadChildren: () => import('./homescreen/event-details/event-details.module').then( m => m.EventDetailsPageModule)
  // }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
