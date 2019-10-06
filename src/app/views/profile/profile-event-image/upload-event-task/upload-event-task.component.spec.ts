import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadEventTaskComponent } from './upload-event-task.component';

describe('UploadEventTaskComponent', () => {
  let component: UploadEventTaskComponent;
  let fixture: ComponentFixture<UploadEventTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadEventTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadEventTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
