import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusAreaComponent } from './status-area.component';

describe('StatusAreaComponent', () => {
  let component: StatusAreaComponent;
  let fixture: ComponentFixture<StatusAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
