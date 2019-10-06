import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingArtistListComponent } from './funding-artist-list.component';

describe('FundingArtistListComponent', () => {
  let component: FundingArtistListComponent;
  let fixture: ComponentFixture<FundingArtistListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundingArtistListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundingArtistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
