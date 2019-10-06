import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAccountingComponent } from './profile-accounting.component';

describe('ProfileAccountingComponent', () => {
  let component: ProfileAccountingComponent;
  let fixture: ComponentFixture<ProfileAccountingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAccountingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAccountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
