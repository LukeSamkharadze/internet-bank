import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { components } from './components';
import { SharedModule } from '@shared/shared';
import { CardService } from './services/card.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { DepositService } from './services/deposit.service';
import { LoanService } from './services/loan.service';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';

const services = [
  CardService,
  UserService,
  AuthService,
  DepositService,
  LoanService,
];
const modules = [CommonModule, ChartsModule, SharedModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules],
  providers: [...services],
})
export class FeaturesSharedModule {}
