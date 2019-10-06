import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjPaymentComponent } from './proj-payment.component';

describe('ProjPaymentComponent', () => {
  let component: ProjPaymentComponent;
  let fixture: ComponentFixture<ProjPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
