import { NgModule } from '@angular/core';
import { CardViewRoutingModule } from './card-view-routing.module';
import { CardViewTemplateComponent } from './card-view-template/card-view-template.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared';
import { ToListFormatterService } from './services/to-list-formatter.service';
import { ToTemplateFormatterService } from './services/to-template-formatter.service';
import { CardDetailsComponent } from './card-details/card-details.component';
import { DepositDetailsComponent } from './deposit-details/deposit-details.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { CardViewComponent } from './card-view.component';
import { CardDetailsGuard } from './guards/card-details.guard';
import { DepositDetailsGuard } from './guards/deposit-details.guard';
import { LoanDetailsGuard } from './guards/loan-details.guard';

@NgModule({
  declarations: [
    CardViewComponent,
    CardViewTemplateComponent,
    CardDetailsComponent,
    DepositDetailsComponent,
    LoanDetailsComponent,
  ],
  imports: [CommonModule, SharedModule, CardViewRoutingModule],
  providers: [
    ToListFormatterService,
    ToTemplateFormatterService,
    CardDetailsGuard,
    DepositDetailsGuard,
    LoanDetailsGuard,
  ],
  exports: [CardViewComponent],
})
export class CardViewModule {}
