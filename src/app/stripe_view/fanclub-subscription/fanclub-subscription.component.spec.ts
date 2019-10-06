import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FanclubSubscriptionComponent } from './fanclub-subscription.component';

describe('FanclubSubscriptionComponent', () => {
  let component: FanclubSubscriptionComponent;
  let fixture: ComponentFixture<FanclubSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FanclubSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FanclubSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
