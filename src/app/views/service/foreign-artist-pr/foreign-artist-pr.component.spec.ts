import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignArtistPrComponent } from './foreign-artist-pr.component';

describe('ForeignArtistPrComponent', () => {
  let component: ForeignArtistPrComponent;
  let fixture: ComponentFixture<ForeignArtistPrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForeignArtistPrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForeignArtistPrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
