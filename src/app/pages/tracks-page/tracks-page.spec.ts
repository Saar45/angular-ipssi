import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksPage } from './tracks-page';

describe('TracksPage', () => {
  let component: TracksPage;
  let fixture: ComponentFixture<TracksPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TracksPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TracksPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
