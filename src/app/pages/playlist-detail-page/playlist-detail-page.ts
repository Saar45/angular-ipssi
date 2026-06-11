import { Component, computed, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { combineLatest, switchMap } from 'rxjs';
import { TrackList } from '../../track-list/track-list';
import { PlaylistService } from '../../services/playlist';
import { TrackService } from '../../services/track';
import { Playlist } from '../../models/playlist';
import { Track } from '../../models/track';

@Component({
  selector: 'app-playlist-detail-page',
  imports: [TrackList, RouterLink],
  templateUrl: './playlist-detail-page.html',
  styleUrl: './playlist-detail-page.css',
})
export class PlaylistDetailPage {
  private readonly playlistService = inject(PlaylistService);
  private readonly trackService = inject(TrackService);
  private readonly router = inject(Router);

  id = input.required<string>();
  protected readonly playlistId = computed(() => Number(this.id()));

  // Charge la playlist + tous les morceaux en parallèle.
  private readonly data = toSignal(
    toObservable(this.playlistId).pipe(
      switchMap((id) =>
        combineLatest([this.playlistService.getPlaylist(id), this.trackService.getTracks()]),
      ),
    ),
    { initialValue: [null, []] as [Playlist | null, Track[]] },
  );

  protected readonly playlist = computed(() => this.data()[0]);

  /** Résout les trackIds de la playlist en objets Track. */
  protected readonly tracks = computed(() => {
    const [playlist, allTracks] = this.data();
    if (!playlist) return [];
    return playlist.trackIds
      .map((id) => allTracks.find((t) => t.id === id))
      .filter((t): t is Track => t !== undefined);
  });

  protected openTrack(track: Track): void {
    this.router.navigate(['/tracks', track.id]);
  }
}
