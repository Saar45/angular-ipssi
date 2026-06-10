import { Service, signal } from '@angular/core';

export interface AppNotification {
  type: 'error' | 'success';
  message: string;
}

@Service()
export class NotificationService {
  readonly current = signal<AppNotification | null>(null);

  error(message: string): void {
    this.current.set({ type: 'error', message });
  }

  success(message: string): void {
    this.current.set({ type: 'success', message });
  }

  clear(): void {
    this.current.set(null);
  }
}
