import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TrackDetail } from '../../track-detail/track-detail';
import { TrackService } from '../../services/track';
import { AuthService } from '../../services/auth';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-track-detail-page',
  imports: [TrackDetail, RouterLink],
  templateUrl: './track-detail-page.html',
  styleUrl: './track-detail-page.css',
})
export class TrackDetailPage {
  private readonly trackService = inject(TrackService);
  protected readonly auth = inject(AuthService);
  private readonly notifications = inject(NotificationService);
  private readonly router = inject(Router);

  /** Lié au paramètre de route `:id` via withComponentInputBinding(). */
  id = input.required<string>();
  protected readonly trackId = computed(() => Number(this.id()));

  protected onDelete(): void {
    this.trackService.deleteTrack(this.trackId()).subscribe(() => {
      this.notifications.success('Morceau supprimé.');
      this.router.navigate(['/tracks']);
    });
  }
}
