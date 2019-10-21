import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Toku345StatusComponent } from './toku345-status.component';

describe('Toku345StatusComponent', () => {
  let component: Toku345StatusComponent;
  let fixture: ComponentFixture<Toku345StatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Toku345StatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Toku345StatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
