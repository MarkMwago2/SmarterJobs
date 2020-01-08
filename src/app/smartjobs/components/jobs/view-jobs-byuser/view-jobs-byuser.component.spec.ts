import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobsByuserComponent } from './view-jobs-byuser.component';

describe('ViewJobsByuserComponent', () => {
  let component: ViewJobsByuserComponent;
  let fixture: ComponentFixture<ViewJobsByuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewJobsByuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewJobsByuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
