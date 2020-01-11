import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInterviewedComponent } from './view-interviewed.component';

describe('ViewInterviewedComponent', () => {
  let component: ViewInterviewedComponent;
  let fixture: ComponentFixture<ViewInterviewedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInterviewedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInterviewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
