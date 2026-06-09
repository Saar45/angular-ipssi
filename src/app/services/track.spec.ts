import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { TrackService } from './track';

describe('TrackService', () => {
  let service: TrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(TrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
