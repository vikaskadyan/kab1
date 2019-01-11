import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalstatusviewComponent } from './totalstatusview.component';

describe('TotalstatusviewComponent', () => {
  let component: TotalstatusviewComponent;
  let fixture: ComponentFixture<TotalstatusviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalstatusviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalstatusviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
