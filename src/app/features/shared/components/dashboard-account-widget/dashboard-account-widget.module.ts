import { NgModule } from '@angular/core';
import { FeaturesSharedModule } from '../../features-shared.module';
import { DashboardAccountWidgetComponent } from './dashboard-account-widget.component';
import { GetCardServiceService } from './get-card-service.service';
import { IncomeOutcomeService } from './income-outcome.service';

@NgModule({
  declarations: [DashboardAccountWidgetComponent],
  imports: [FeaturesSharedModule],
  providers: [GetCardServiceService, IncomeOutcomeService],
  exports: [DashboardAccountWidgetComponent],
})
export class DashboardAccountWidgetModule {}
