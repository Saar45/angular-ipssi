import { Component, computed, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { TrackForm, TrackFormValue } from '../../track-form/track-form';
import { TrackService } from '../../services/track';
import { NotificationService } from '../../services/notification';
import { Track } from '../../models/track';

@Component({
  selector: 'app-track-form-page',
  imports: [TrackForm],
  templateUrl: './track-form-page.html',
  styleUrl: './track-form-page.css',
})
export class TrackFormPage {
  private readonly trackService = inject(TrackService);
  private readonly notifications = inject(NotificationService);
  private readonly router = inject(Router);

  /** Paramètre `:id` présent uniquement en mode édition. */
  id = input<string>();
  private readonly editId = computed(() => (this.id() ? Number(this.id()) : null));

  /** Charge le morceau à éditer (ou null en mode ajout). */
  protected readonly editTrack = toSignal(
    toObservable(this.editId).pipe(
      switchMap((id) => (id !== null ? this.trackService.getTrack(id) : of(null))),
    ),
    { initialValue: null as Track | null },
  );

  protected onSave(value: TrackFormValue): void {
    const id = this.editId();
    const request$ =
      id !== null
        ? this.trackService.updateTrack(id, value)
        : this.trackService.createTrack(value);

    request$.subscribe((track) => {
      this.notifications.success(id !== null ? 'Morceau mis à jour.' : 'Morceau ajouté.');
      this.router.navigate(['/tracks', track.id]);
    });
  }

  protected onCancel(): void {
    this.router.navigate(['/tracks']);
  }
}
