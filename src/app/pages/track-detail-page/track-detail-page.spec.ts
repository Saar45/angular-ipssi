import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackDetailPage } from './track-detail-page';

describe('TrackDetailPage', () => {
  let component: TrackDetailPage;
  let fixture: ComponentFixture<TrackDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackDetailPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackDetailPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
