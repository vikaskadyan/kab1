import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalstatusComponent } from './totalstatus.component';

describe('TotalstatusComponent', () => {
  let component: TotalstatusComponent;
  let fixture: ComponentFixture<TotalstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
