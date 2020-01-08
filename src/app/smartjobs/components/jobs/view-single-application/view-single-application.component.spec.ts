import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleApplicationComponent } from './view-single-application.component';

describe('ViewSingleApplicationComponent', () => {
  let component: ViewSingleApplicationComponent;
  let fixture: ComponentFixture<ViewSingleApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSingleApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
