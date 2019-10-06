import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileProjectComponent } from './profile-project.component';

describe('ProfileProjectComponent', () => {
  let component: ProfileProjectComponent;
  let fixture: ComponentFixture<ProfileProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
