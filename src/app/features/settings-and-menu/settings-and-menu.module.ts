import { NgModule } from '@angular/core';
import { SettingsAndMenuComponent } from './settings-and-menu.component';
import { FeaturesSharedModule } from '../shared/features-shared.module';
import { SettingsAndMenuRouting } from './settings-and-menu-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { DeactivateComponent } from './deactivate/deactivate.component';
import { PaymentLimitsModule } from '../payment-limits/payment-limits.module';

@NgModule({
  declarations: [
    SettingsAndMenuComponent,
    SettingsComponent,
    DeactivateComponent,
  ],
  imports: [FeaturesSharedModule, SettingsAndMenuRouting, PaymentLimitsModule],
  exports: [SettingsAndMenuComponent],
  providers: [],
})
export class SettingsAndMenuModule {}
