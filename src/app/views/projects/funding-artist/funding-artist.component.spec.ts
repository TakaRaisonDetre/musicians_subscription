import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingArtistComponent } from './funding-artist.component';

describe('FundingArtistComponent', () => {
  let component: FundingArtistComponent;
  let fixture: ComponentFixture<FundingArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundingArtistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundingArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
