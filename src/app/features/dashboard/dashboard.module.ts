import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { FeaturesSharedModule } from '@features/shared';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [FeaturesSharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
