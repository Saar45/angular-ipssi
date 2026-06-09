import { HttpClient, HttpParams } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Track } from '../models/track';
import { TrackFormValue } from '../track-form/track-form';
import { environment } from '../../environments/environment';

@Service()
export class TrackService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/tracks`;

  /** F7 — liste complète (ou filtrée côté serveur via ?q=). */
  getTracks(query = ''): Observable<Track[]> {
    const params = query.trim() ? new HttpParams().set('q', query.trim()) : undefined;
    return this.http.get<Track[]>(this.baseUrl, { params });
  }

  /** F8 — détail d'un morceau. */
  getTrack(id: number): Observable<Track> {
    return this.http.get<Track>(`${this.baseUrl}/${id}`);
  }

  createTrack(track: TrackFormValue): Observable<Track> {
    return this.http.post<Track>(this.baseUrl, track);
  }

  updateTrack(id: number, track: TrackFormValue): Observable<Track> {
    return this.http.put<Track>(`${this.baseUrl}/${id}`, track);
  }

  deleteTrack(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
