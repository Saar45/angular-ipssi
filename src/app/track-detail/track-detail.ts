import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { TrackService } from '../services/track';
import { DurationPipe } from '../pipes/duration-pipe';

@Component({
  selector: 'app-track-detail',
  imports: [DurationPipe],
  templateUrl: './track-detail.html',
  styleUrl: './track-detail.css',
})
export class TrackDetail {
  private readonly trackService = inject(TrackService);

  trackId = input.required<number>();

  /** F8 — le détail est rechargé à chaque changement d'id, exposé en signal via toSignal. */
  protected readonly track = toSignal(
    toObservable(this.trackId).pipe(switchMap((id) => this.trackService.getTrack(id))),
  );
}
