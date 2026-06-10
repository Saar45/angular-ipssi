import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackFormPage } from './track-form-page';

describe('TrackFormPage', () => {
  let component: TrackFormPage;
  let fixture: ComponentFixture<TrackFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackFormPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackFormPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
