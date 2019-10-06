import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadArtistTaskComponent } from './upload-artist-task.component';

describe('UploadArtistTaskComponent', () => {
  let component: UploadArtistTaskComponent;
  let fixture: ComponentFixture<UploadArtistTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadArtistTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadArtistTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
