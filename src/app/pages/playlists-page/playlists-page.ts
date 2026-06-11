import { Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { PlaylistService } from '../../services/playlist';
import { NotificationService } from '../../services/notification';
import { Playlist } from '../../models/playlist';

@Component({
  selector: 'app-playlists-page',
  imports: [RouterLink],
  templateUrl: './playlists-page.html',
  styleUrl: './playlists-page.css',
})
export class PlaylistsPage {
  private readonly playlistService = inject(PlaylistService);
  private readonly notifications = inject(NotificationService);

  private readonly reload = signal(0);

  private readonly playlists = toSignal(
    toObservable(this.reload).pipe(switchMap(() => this.playlistService.getPlaylists())),
    { initialValue: [] as Playlist[] },
  );

  // Recherche par nom (filtrage réactif côté client).
  protected readonly query = signal('');
  protected readonly filtered = computed(() => {
    const term = this.query().trim().toLowerCase();
    if (!term) return this.playlists();
    return this.playlists().filter((p) => p.name.toLowerCase().includes(term));
  });

  protected onDelete(playlist: Playlist): void {
    this.playlistService.deletePlaylist(playlist.id).subscribe(() => {
      this.notifications.success('Playlist supprimée.');
      this.reload.update((n) => n + 1);
    });
  }
}
