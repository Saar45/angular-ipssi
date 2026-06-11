import { Component, computed, input, linkedSignal, output } from '@angular/core';
import { form, required, minLength, FormField } from '@angular/forms/signals';
import { Playlist } from '../models/playlist';
import { Track } from '../models/track';
import { PlaylistFormValue } from '../services/playlist';

@Component({
  selector: 'app-playlist-form',
  imports: [FormField],
  templateUrl: './playlist-form.html',
  styleUrl: './playlist-form.css',
})
export class PlaylistForm {
  /** Playlist à éditer ; `null` = mode création. */
  editPlaylist = input<Playlist | null>(null);
  /** Morceaux disponibles pour composer la playlist. */
  availableTracks = input.required<Track[]>();

  save = output<PlaylistFormValue>();
  cancel = output<void>();

  protected readonly editing = computed(() => this.editPlaylist() !== null);

  protected readonly model = linkedSignal<Playlist | null, PlaylistFormValue>({
    source: this.editPlaylist,
    computation: (playlist) =>
      playlist
        ? { name: playlist.name, trackIds: [...playlist.trackIds] }
        : { name: '', trackIds: [] },
  });

  protected readonly f = form(this.model, (path) => {
    required(path.name, { message: 'Le nom est obligatoire.' });
    minLength(path.name, 2, { message: 'Au moins 2 caractères.' });
    minLength(path.trackIds, 1, { message: 'Sélectionne au moins un morceau.' });
  });

  protected isSelected(id: number): boolean {
    return this.model().trackIds.includes(id);
  }

  protected toggleTrack(id: number): void {
    this.model.update((m) => ({
      ...m,
      trackIds: m.trackIds.includes(id)
        ? m.trackIds.filter((x) => x !== id)
        : [...m.trackIds, id],
    }));
  }

  protected onSubmit(): void {
    if (!this.f().valid()) return;
    this.save.emit(this.model());
  }
}
