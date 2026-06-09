import { Directive, computed, input } from '@angular/core';

@Directive({
  selector: '[appRatingColor]',
  host: {
    '[style.background-color]': 'color()',
  },
})
export class RatingColor {
  appRatingColor = input.required<number>();

  protected readonly color = computed(() => {
    const rating = this.appRatingColor();
    if (rating >= 9) return '#2ecc71';
    if (rating >= 7) return '#f39c12';
    return '#e74c3c';
  });
}
