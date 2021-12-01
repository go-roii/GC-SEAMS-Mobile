import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {AutologinGuard} from './guards/autologin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.page.module').then(m => m.LoginPageModule),
    canLoad: [AutologinGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
    canLoad: [AutologinGuard]
  },
  {
    path: 'homescreen',
    loadChildren: () => import('./homescreen/tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'scan-qr-modal',
    loadChildren: () => import('./homescreen/scan-qr-modal/scan-qr-modal.module').then( m => m.ScanQrModalPageModule),
    canLoad: [AuthGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
