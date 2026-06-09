# CinéTrack 🎵

Bibliothèque musicale — projet fil rouge de la formation Angular 22 & API REST (IPSSI BD3 26.2).

## J1 — Faire apparaître la musique à l'écran

- **F1** — Carte morceau (`TrackCard`) : standalone, interpolation, property binding, `input.required<Track>()`.
- **F2** — Liste (`TrackList`) : nouveau control flow `@for` (avec `track`) et `@empty`.
- **F3** — Sélection : `output()`, event binding, `@if` et carte active via un `signal`.

L'état (tableau de `Track`) est détenu par le composant racine `App` et passé en `input()`.

## J2 — Rendre l'application vivante

- **F4** — Recherche en direct : `signal` (`query`) + `computed` (`filteredTracks`).
- **F5** — Durée formatée & badge : pipe `duration` (`m:ss`), directive `appRatingColor` et `@switch` (palier de qualité).
- **F6** — Ajouter / éditer : **Signal Forms** (`form`, `required`, `min`, `max`, `minLength`, `[formField]`) avec `linkedSignal` pour basculer ajout/édition.

## J3 — Brancher l'application sur une vraie API

Backend : [music-api](https://github.com/StephaneRavet/music-api) (Express + SQLite + JWT) sur `http://localhost:3000`. URL configurée dans `src/environments/environment*.ts` (`apiUrl`).

- **F7** — Charger depuis l'API : `TrackService` + `HttpClient` GET `/tracks`.
- **F8** — Fiche détail (`TrackDetail`) : `toSignal` + `switchMap` sur l'id → GET `/tracks/:id`.
- **F9** — Recherche côté serveur : `query` → `toObservable` → `debounceTime` + `distinctUntilChanged` + `switchMap` → GET `/tracks?q=`.
- **F10** — Se connecter : `AuthService` (login `POST /login`, token en `localStorage`, signaux `isLoggedIn`/`user`) + **intercepteur** `authInterceptor` (en-tête `Authorization: Bearer`).
- Le formulaire d'ajout/édition persiste désormais via l'API (POST/PUT/DELETE authentifiés) — anticipe **F11**.

Compte de démo : `demo@ipssi.fr` / `password123`.

### Lancer le projet complet

```bash
# backend (dans le dépôt music-api)
npm install && npm start          # http://localhost:3000

# frontend (ce dépôt)
npm install && ng serve           # http://localhost:4200
```

## Démarrer

```bash
npm install
ng serve
```

L'application est servie sur http://localhost:4200.

## Stack

Angular 22 (standalone, signals), TypeScript, CSS.
