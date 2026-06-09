import { Component, computed, input, linkedSignal, output } from '@angular/core';
import {
  form,
  required,
  minLength,
  min,
  max,
  FormField,
} from '@angular/forms/signals';
import { Track } from '../models/track';

export type TrackFormValue = Omit<Track, 'id' | 'coverUrl'>;

function blankTrack(): TrackFormValue {
  return {
    title: '',
    artist: '',
    album: '',
    genre: '',
    durationSeconds: 0,
    year: 2024,
    rating: 5,
    favorite: false,
  };
}

@Component({
  selector: 'app-track-form',
  imports: [FormField],
  templateUrl: './track-form.html',
  styleUrl: './track-form.css',
})
export class TrackForm {
  /** Morceau à éditer ; `null` = mode ajout. */
  editTrack = input<Track | null>(null);

  save = output<TrackFormValue>();
  cancel = output<void>();

  protected readonly editing = computed(() => this.editTrack() !== null);

  /** Modèle réactif : se réinitialise automatiquement quand `editTrack` change. */
  protected readonly model = linkedSignal<Track | null, TrackFormValue>({
    source: this.editTrack,
    computation: (track) => {
      if (!track) return blankTrack();
      const { id, coverUrl, ...value } = track;
      return value;
    },
  });

  protected readonly f = form(this.model, (path) => {
    required(path.title, { message: 'Le titre est obligatoire.' });
    minLength(path.title, 2, { message: 'Au moins 2 caractères.' });
    required(path.artist, { message: "L'artiste est obligatoire." });
    min(path.durationSeconds, 1, { message: 'Durée invalide.' });
    min(path.year, 1900, { message: 'Année trop ancienne.' });
    max(path.year, 2100, { message: 'Année invalide.' });
    min(path.rating, 0, { message: 'Note minimale : 0.' });
    max(path.rating, 10, { message: 'Note maximale : 10.' });
  });

  protected onSubmit(): void {
    if (!this.f().valid()) return;
    this.save.emit(this.model());
    this.model.set(blankTrack());
  }
}
