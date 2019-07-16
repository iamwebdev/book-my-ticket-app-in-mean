import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupShowComponent } from './setup-show.component';

describe('SetupShowComponent', () => {
  let component: SetupShowComponent;
  let fixture: ComponentFixture<SetupShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
