import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedLayoutComponent } from './shared-layout.component';

describe('SharedLayoutComponent', () => {
  let component: SharedLayoutComponent;
  let fixture: ComponentFixture<SharedLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SharedLayoutComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
