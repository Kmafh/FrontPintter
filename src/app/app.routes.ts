import { Routes } from '@angular/router';
import { PagesComponent } from './features/pages.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProfileComponent } from './features/profile/profile.component';
import { AuthComponent } from './features/auth/auth.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ConfirmationRegisterComponent } from './features/auth/confirmation-register/confirmation-register.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
    ],
  },
  {
    path: 'profile',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ProfileComponent, data: { title: 'Dashboard' } },
    ],
  },
  {
    path: 'login',
    component: AuthComponent,
    data: { title: 'Dashboard' },
  },
  {
    path: 'register',
    component: PagesComponent,
    children: [
      { path: '', component: ConfirmationRegisterComponent,data:{title:'Mis citas'} },
      //{ path: ':id', component: ProfileComponent,data:{title:'Perfil'} },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
