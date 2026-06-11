import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistFormPage } from './playlist-form-page';

describe('PlaylistFormPage', () => {
  let component: PlaylistFormPage;
  let fixture: ComponentFixture<PlaylistFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistFormPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistFormPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
