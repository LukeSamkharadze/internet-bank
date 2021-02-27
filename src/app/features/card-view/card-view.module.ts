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
import { FeaturesSharedModule } from '../shared/features-shared.module';

@NgModule({
  declarations: [
    CardViewComponent,
    CardViewTemplateComponent,
    CardDetailsComponent,
    DepositDetailsComponent,
    LoanDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FeaturesSharedModule,
    CardViewRoutingModule,
  ],
  providers: [ToListFormatterService, ToTemplateFormatterService],
  exports: [CardViewComponent],
})
export class CardViewModule {}
