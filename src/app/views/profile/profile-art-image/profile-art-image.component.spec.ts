import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileArtImageComponent } from './profile-art-image.component';

describe('ProfileArtImageComponent', () => {
  let component: ProfileArtImageComponent;
  let fixture: ComponentFixture<ProfileArtImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileArtImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileArtImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
