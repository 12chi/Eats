import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewreviewsComponent } from './newreviews.component';

describe('NewreviewsComponent', () => {
  let component: NewreviewsComponent;
  let fixture: ComponentFixture<NewreviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewreviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
