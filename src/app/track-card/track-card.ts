import { Component, computed, input, output } from '@angular/core';
import { Track } from '../models/track';
import { DurationPipe } from '../pipes/duration-pipe';
import { RatingColor } from '../directives/rating-color';

type RatingTier = 'top' | 'good' | 'average';

@Component({
  selector: 'app-track-card',
  imports: [DurationPipe, RatingColor],
  templateUrl: './track-card.html',
  styleUrl: './track-card.css',
})
export class TrackCard {
  track = input.required<Track>();
  active = input(false);
  select = output<Track>();

  protected readonly tier = computed<RatingTier>(() => {
    const rating = this.track().rating;
    if (rating >= 9) return 'top';
    if (rating >= 7) return 'good';
    return 'average';
  });
}
