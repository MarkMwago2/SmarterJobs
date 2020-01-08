import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShortlistComponent } from './view-shortlist.component';

describe('ViewShortlistComponent', () => {
  let component: ViewShortlistComponent;
  let fixture: ComponentFixture<ViewShortlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewShortlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewShortlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
