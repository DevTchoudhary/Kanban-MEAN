import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
    // canActivate: [authGuard]
  },
  {
    path: 'kanban-board',
    loadComponent: () =>
      import('./components/kanban-board/kanban-board.component').then(
        (m) => m.KanbanBoardComponent
      ),
    // canActivate: [authGuard]
  },
  {
    path: 'meetings',
    loadComponent: () =>
      import('./components/meetings/meetings.component').then(
        (m) => m.MeetingsComponent
      ),
    // canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
    // canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to home if no path matches
  { path: '**', redirectTo: '/login' }, // Wildcard route for a 404 page, redirecting to home
];

export default routes;
