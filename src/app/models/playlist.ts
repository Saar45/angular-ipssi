export interface Playlist {
  id: number;
  name: string;
  userId: number;
  trackIds: number[];
  createdAt?: string;
}
