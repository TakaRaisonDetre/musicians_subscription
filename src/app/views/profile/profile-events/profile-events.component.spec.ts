import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEventsComponent } from './profile-events.component';

describe('ProfileEventsComponent', () => {
  let component: ProfileEventsComponent;
  let fixture: ComponentFixture<ProfileEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
