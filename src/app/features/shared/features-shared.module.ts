import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { components } from './components';
import { SharedModule } from '@shared/shared';
import { CardService } from './services/card.service';
import { DepositService } from './services/deposit.service';
import { LoanService } from './services/loan.service';

const services = [CardService, DepositService, LoanService];
const modules = [CommonModule, SharedModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules],
  providers: [...services],
})
export class FeaturesSharedModule {}
