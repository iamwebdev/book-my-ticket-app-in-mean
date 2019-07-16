import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMMovieComponent } from './add-mmovie.component';

describe('AddMMovieComponent', () => {
  let component: AddMMovieComponent;
  let fixture: ComponentFixture<AddMMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
