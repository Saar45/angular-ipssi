import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tracks' },
  {
    path: 'tracks',
    loadComponent: () => import('./pages/tracks-page/tracks-page').then((m) => m.TracksPage),
  },
  {
    path: 'tracks/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/track-form-page/track-form-page').then((m) => m.TrackFormPage),
  },
  {
    path: 'tracks/:id/edit',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/track-form-page/track-form-page').then((m) => m.TrackFormPage),
  },
  {
    path: 'tracks/:id',
    loadComponent: () =>
      import('./pages/track-detail-page/track-detail-page').then((m) => m.TrackDetailPage),
  },
  {
    path: 'favorites',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/favorites-page/favorites-page').then((m) => m.FavoritesPage),
  },
  {
    path: 'playlists',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/playlists-page/playlists-page').then((m) => m.PlaylistsPage),
  },
  {
    path: 'playlists/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/playlist-form-page/playlist-form-page').then((m) => m.PlaylistFormPage),
  },
  {
    path: 'playlists/:id/edit',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/playlist-form-page/playlist-form-page').then((m) => m.PlaylistFormPage),
  },
  {
    path: 'playlists/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/playlist-detail-page/playlist-detail-page').then(
        (m) => m.PlaylistDetailPage,
      ),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page').then((m) => m.NotFoundPage),
  },
];
