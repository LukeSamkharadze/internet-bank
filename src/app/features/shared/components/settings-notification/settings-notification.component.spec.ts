import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsNotificationComponent } from './settings-notification.component';

describe('SettingsNotificationComponent', () => {
  let component: SettingsNotificationComponent;
  let fixture: ComponentFixture<SettingsNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsNotificationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
