import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePublicComponent } from './profile-public.component';

describe('ProfilePublicComponent', () => {
  let component: ProfilePublicComponent;
  let fixture: ComponentFixture<ProfilePublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
