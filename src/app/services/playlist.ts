import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Playlist } from '../models/playlist';
import { environment } from '../../environments/environment';

export interface PlaylistFormValue {
  name: string;
  trackIds: number[];
}

@Service()
export class PlaylistService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/playlists`;

  /** Playlists de l'utilisateur connecté. */
  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.baseUrl);
  }

  /** Pas de GET /playlists/:id côté API : on dérive depuis la liste. */
  getPlaylist(id: number): Observable<Playlist | null> {
    return this.getPlaylists().pipe(map((list) => list.find((p) => p.id === id) ?? null));
  }

  createPlaylist(playlist: PlaylistFormValue): Observable<Playlist> {
    return this.http.post<Playlist>(this.baseUrl, playlist);
  }

  updatePlaylist(id: number, playlist: PlaylistFormValue): Observable<Playlist> {
    return this.http.put<Playlist>(`${this.baseUrl}/${id}`, playlist);
  }

  deletePlaylist(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
