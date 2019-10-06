import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRevenueComponent } from './profile-revenue.component';

describe('ProfileRevenueComponent', () => {
  let component: ProfileRevenueComponent;
  let fixture: ComponentFixture<ProfileRevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileRevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
