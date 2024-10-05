import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(x => x.HomePageComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(x => x.LoginComponent),
  }
];
