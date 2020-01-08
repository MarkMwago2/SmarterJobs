import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApplicationsUserComponent } from './view-applications-user.component';

describe('ViewApplicationsUserComponent', () => {
  let component: ViewApplicationsUserComponent;
  let fixture: ComponentFixture<ViewApplicationsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewApplicationsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewApplicationsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
