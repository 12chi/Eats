import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllrestComponent } from './allrest.component';

describe('AllrestComponent', () => {
  let component: AllrestComponent;
  let fixture: ComponentFixture<AllrestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllrestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllrestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
