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

## Démarrer

```bash
npm install
ng serve
```

L'application est servie sur http://localhost:4200.

## Stack

Angular 22 (standalone, signals), TypeScript, CSS.
