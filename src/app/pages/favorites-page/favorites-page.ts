import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { combineLatest, debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';
import { TrackList } from '../../track-list/track-list';
import { TrackService } from '../../services/track';
import { Track } from '../../models/track';

@Component({
  selector: 'app-favorites-page',
  imports: [TrackList],
  templateUrl: './favorites-page.html',
  styleUrl: './favorites-page.css',
})
export class FavoritesPage {
  private readonly trackService = inject(TrackService);
  private readonly router = inject(Router);

  protected readonly query = signal('');
  private readonly reload = signal(0);

  // Favoris filtrés côté serveur (?favorite=true) + recherche, rechargés après bascule.
  protected readonly tracks = toSignal(
    combineLatest([
      toObservable(this.query).pipe(debounceTime(300), startWith(''), distinctUntilChanged()),
      toObservable(this.reload),
    ]).pipe(switchMap(([term]) => this.trackService.getFavorites(term))),
    { initialValue: [] as Track[] },
  );

  protected openDetail(track: Track): void {
    this.router.navigate(['/tracks', track.id]);
  }

  protected onToggleFavorite(track: Track): void {
    this.trackService.setFavorite(track.id, !track.favorite).subscribe(() => {
      this.reload.update((n) => n + 1);
    });
  }
}
