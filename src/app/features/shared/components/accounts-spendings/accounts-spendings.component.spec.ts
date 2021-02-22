import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsSpendingsComponent } from './accounts-spendings.component';

describe('AccountsSpendingsComponent', () => {
  let component: AccountsSpendingsComponent;
  let fixture: ComponentFixture<AccountsSpendingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountsSpendingsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsSpendingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
