import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEventImageComponent } from './profile-event-image.component';

describe('ProfileEventImageComponent', () => {
  let component: ProfileEventImageComponent;
  let fixture: ComponentFixture<ProfileEventImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEventImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEventImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
