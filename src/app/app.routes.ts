import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contracts } from './pages/contracts/contracts';
import { Grants } from './pages/grants/grants';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'contracts', component: Contracts },
  { path: 'grants', component: Grants },
  { path: '**', redirectTo: '' }, // Redirect any unknown routes to home
];
