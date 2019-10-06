import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosSearchComponent } from './videos-search.component';

describe('VideosSearchComponent', () => {
  let component: VideosSearchComponent;
  let fixture: ComponentFixture<VideosSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
