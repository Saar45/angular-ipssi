import { Component, computed, signal } from '@angular/core';
import { TrackList } from './track-list/track-list';
import { TrackForm, TrackFormValue } from './track-form/track-form';
import { Track } from './models/track';

@Component({
  selector: 'app-root',
  imports: [TrackList, TrackForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly tracks = signal<Track[]>([
    {
      id: 1,
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours',
      genre: 'Synth-pop',
      durationSeconds: 200,
      year: 2019,
      rating: 9,
      favorite: true,
      coverUrl: 'https://picsum.photos/seed/1/300',
    },
    {
      id: 2,
      title: 'As It Was',
      artist: 'Harry Styles',
      album: "Harry's House",
      genre: 'Pop',
      durationSeconds: 167,
      year: 2022,
      rating: 8,
      favorite: false,
      coverUrl: 'https://picsum.photos/seed/2/300',
    },
    {
      id: 3,
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      album: 'A Night at the Opera',
      genre: 'Rock',
      durationSeconds: 354,
      year: 1975,
      rating: 10,
      favorite: true,
      coverUrl: 'https://picsum.photos/seed/3/300',
    },
    {
      id: 4,
      title: 'Get Lucky',
      artist: 'Daft Punk',
      album: 'Random Access Memories',
      genre: 'Disco',
      durationSeconds: 248,
      year: 2013,
      rating: 8,
      favorite: false,
      coverUrl: 'https://picsum.photos/seed/4/300',
    },
    {
      id: 5,
      title: 'Smells Like Teen Spirit',
      artist: 'Nirvana',
      album: 'Nevermind',
      genre: 'Grunge',
      durationSeconds: 301,
      year: 1991,
      rating: 9,
      favorite: true,
      coverUrl: 'https://picsum.photos/seed/5/300',
    },
    {
      id: 6,
      title: 'Bad Guy',
      artist: 'Billie Eilish',
      album: 'When We All Fall Asleep, Where Do We Go?',
      genre: 'Electropop',
      durationSeconds: 194,
      year: 2019,
      rating: 8,
      favorite: false,
      coverUrl: 'https://picsum.photos/seed/6/300',
    },
    {
      id: 7,
      title: 'Levitating',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      genre: 'Pop',
      durationSeconds: 203,
      year: 2020,
      rating: 7,
      favorite: false,
      coverUrl: 'https://picsum.photos/seed/7/300',
    },
    {
      id: 8,
      title: 'Lose Yourself',
      artist: 'Eminem',
      album: '8 Mile',
      genre: 'Hip-hop',
      durationSeconds: 326,
      year: 2002,
      rating: 10,
      favorite: true,
      coverUrl: 'https://picsum.photos/seed/8/300',
    },
  ]);

  // F4 — recherche en direct (signal + computed)
  protected readonly query = signal('');
  protected readonly filteredTracks = computed(() => {
    const term = this.query().trim().toLowerCase();
    if (!term) return this.tracks();
    return this.tracks().filter(
      (track) =>
        track.title.toLowerCase().includes(term) ||
        track.artist.toLowerCase().includes(term) ||
        track.album.toLowerCase().includes(term),
    );
  });

  // Sélection / édition
  protected readonly selectedId = signal<number | null>(null);
  protected readonly selectedTrack = computed(
    () => this.tracks().find((track) => track.id === this.selectedId()) ?? null,
  );

  protected onSelect(track: Track): void {
    this.selectedId.update((current) => (current === track.id ? null : track.id));
  }

  // F6 — ajout / édition via Signal Forms
  protected onSave(value: TrackFormValue): void {
    const editingId = this.selectedId();
    if (editingId !== null) {
      this.tracks.update((tracks) =>
        tracks.map((track) => (track.id === editingId ? { ...track, ...value } : track)),
      );
      this.selectedId.set(null);
      return;
    }
    const nextId = Math.max(0, ...this.tracks().map((track) => track.id)) + 1;
    const newTrack: Track = {
      ...value,
      id: nextId,
      coverUrl: `https://picsum.photos/seed/${nextId}/300`,
    };
    this.tracks.update((tracks) => [...tracks, newTrack]);
  }

  protected onCancelEdit(): void {
    this.selectedId.set(null);
  }
}
