import { Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';
import { TrackList } from './track-list/track-list';
import { TrackForm, TrackFormValue } from './track-form/track-form';
import { TrackDetail } from './track-detail/track-detail';
import { LoginForm } from './login-form/login-form';
import { TrackService } from './services/track';
import { AuthService } from './services/auth';
import { Track } from './models/track';

@Component({
  selector: 'app-root',
  imports: [TrackList, TrackForm, TrackDetail, LoginForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly trackService = inject(TrackService);
  protected readonly auth = inject(AuthService);

  // F4/F9 — la saisie pilote une recherche côté serveur (debounce + switchMap).
  protected readonly query = signal('');
  private readonly reload = signal(0);

  // F7 — la liste vient de l'API ; elle se recharge à chaque recherche ou mutation.
  protected readonly tracks = toSignal(
    combineLatest([
      toObservable(this.query).pipe(debounceTime(300), startWith(''), distinctUntilChanged()),
      toObservable(this.reload),
    ]).pipe(switchMap(([term]) => this.trackService.getTracks(term))),
    { initialValue: [] as Track[] },
  );

  // Sélection / édition
  protected readonly selectedId = signal<number | null>(null);
  protected readonly selectedTrack = computed(
    () => this.tracks().find((track) => track.id === this.selectedId()) ?? null,
  );

  protected onSelect(track: Track): void {
    this.selectedId.update((current) => (current === track.id ? null : track.id));
  }

  // F11 (anticipé) — persistance du formulaire via l'API authentifiée.
  protected onSave(value: TrackFormValue): void {
    const editingId = this.selectedId();
    const request$ =
      editingId !== null
        ? this.trackService.updateTrack(editingId, value)
        : this.trackService.createTrack(value);
    request$.subscribe(() => {
      this.selectedId.set(null);
      this.reload.update((n) => n + 1);
    });
  }

  protected onCancelEdit(): void {
    this.selectedId.set(null);
  }

  protected onDelete(): void {
    const id = this.selectedId();
    if (id === null) return;
    this.trackService.deleteTrack(id).subscribe(() => {
      this.selectedId.set(null);
      this.reload.update((n) => n + 1);
    });
  }
}
