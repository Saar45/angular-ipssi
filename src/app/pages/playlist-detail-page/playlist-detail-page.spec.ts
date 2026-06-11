import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistDetailPage } from './playlist-detail-page';

describe('PlaylistDetailPage', () => {
  let component: PlaylistDetailPage;
  let fixture: ComponentFixture<PlaylistDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistDetailPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistDetailPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
