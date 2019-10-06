import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosPlaylistComponent } from './videos-playlist.component';

describe('VideosPlaylistComponent', () => {
  let component: VideosPlaylistComponent;
  let fixture: ComponentFixture<VideosPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
