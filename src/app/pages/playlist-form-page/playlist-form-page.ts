import { Component, computed, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { PlaylistForm } from '../../playlist-form/playlist-form';
import { PlaylistService, PlaylistFormValue } from '../../services/playlist';
import { TrackService } from '../../services/track';
import { NotificationService } from '../../services/notification';
import { Playlist } from '../../models/playlist';
import { Track } from '../../models/track';

@Component({
  selector: 'app-playlist-form-page',
  imports: [PlaylistForm],
  templateUrl: './playlist-form-page.html',
  styleUrl: './playlist-form-page.css',
})
export class PlaylistFormPage {
  private readonly playlistService = inject(PlaylistService);
  private readonly trackService = inject(TrackService);
  private readonly notifications = inject(NotificationService);
  private readonly router = inject(Router);

  id = input<string>();
  private readonly editId = computed(() => (this.id() ? Number(this.id()) : null));

  protected readonly availableTracks = toSignal(this.trackService.getTracks(), {
    initialValue: [] as Track[],
  });

  protected readonly editPlaylist = toSignal(
    toObservable(this.editId).pipe(
      switchMap((id) => (id !== null ? this.playlistService.getPlaylist(id) : of(null))),
    ),
    { initialValue: null as Playlist | null },
  );

  protected onSave(value: PlaylistFormValue): void {
    const id = this.editId();
    const request$ =
      id !== null
        ? this.playlistService.updatePlaylist(id, value)
        : this.playlistService.createPlaylist(value);

    request$.subscribe((playlist) => {
      this.notifications.success(id !== null ? 'Playlist mise à jour.' : 'Playlist créée.');
      this.router.navigate(['/playlists', playlist.id]);
    });
  }

  protected onCancel(): void {
    this.router.navigate(['/playlists']);
  }
}
