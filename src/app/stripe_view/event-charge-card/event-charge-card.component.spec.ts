import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventChargeCardComponent } from './event-charge-card.component';

describe('EventChargeCardComponent', () => {
  let component: EventChargeCardComponent;
  let fixture: ComponentFixture<EventChargeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventChargeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventChargeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
