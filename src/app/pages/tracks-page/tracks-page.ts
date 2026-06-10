import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';
import { TrackList } from '../../track-list/track-list';
import { TrackService } from '../../services/track';
import { Track } from '../../models/track';

@Component({
  selector: 'app-tracks-page',
  imports: [TrackList],
  templateUrl: './tracks-page.html',
  styleUrl: './tracks-page.css',
})
export class TracksPage {
  private readonly trackService = inject(TrackService);
  private readonly router = inject(Router);

  // F9 — recherche serveur réactive (debounce + switchMap).
  protected readonly query = signal('');

  // F7 — liste chargée depuis l'API ; se relance à chaque recherche.
  protected readonly tracks = toSignal(
    toObservable(this.query).pipe(
      debounceTime(300),
      startWith(''),
      distinctUntilChanged(),
      switchMap((term) => this.trackService.getTracks(term)),
    ),
    { initialValue: [] as Track[] },
  );

  protected openDetail(track: Track): void {
    this.router.navigate(['/tracks', track.id]);
  }
}
