import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMailComposeComponent } from './profile-mail-compose.component';

describe('ProfileMailComposeComponent', () => {
  let component: ProfileMailComposeComponent;
  let fixture: ComponentFixture<ProfileMailComposeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileMailComposeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMailComposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
