import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [ AuthGuard ],
    loadComponent: () => import('./features/home/home.component').then(x => x.HomePageComponent),
  },
  {
    path: 'login',
    data: {
      registered: true,
    },
    loadComponent: () => import('./features/login/login.component').then(x => x.LoginComponent),
  },
  {
    path: 'register',
    data: {
      registered: false,
    },
    loadComponent: () => import('./features/login/login.component').then(x => x.LoginComponent),
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
