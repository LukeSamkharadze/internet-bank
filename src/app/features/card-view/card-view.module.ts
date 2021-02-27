import { NgModule } from '@angular/core';
import { CardViewRoutingModule } from './card-view-routing.module';
import { CardViewTemplateComponent } from './card-view-template/card-view-template.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { DepositDetailsComponent } from './deposit-details/deposit-details.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { CardViewComponent } from './card-view.component';
import { FeaturesSharedModule } from '@features/shared';
import { TemplateFormatService } from './services/template-format.service';
import { ListFormatService } from './services/list-format.service';

@NgModule({
  declarations: [
    CardViewComponent,
    CardViewTemplateComponent,
    CardDetailsComponent,
    DepositDetailsComponent,
    LoanDetailsComponent,
  ],
  imports: [FeaturesSharedModule, CardViewRoutingModule],
  providers: [ListFormatService, TemplateFormatService]
})
export class CardViewModule {}
