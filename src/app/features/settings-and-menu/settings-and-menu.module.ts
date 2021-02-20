import { NgModule } from '@angular/core';
import { SettingsAndMenuComponent } from './settings-and-menu.component';
import { FeaturesSharedModule } from '../shared/features-shared.module';
import { SettingsAndMenuRouting } from './settings-and-menu-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { DeactivateComponent } from './deactivate/deactivate.component';
import { SettingsFormServiceService } from './services/settings-form-service.service';

@NgModule({
  declarations: [
    SettingsAndMenuComponent,
    SettingsComponent,
    DeactivateComponent,
  ],
  imports: [FeaturesSharedModule, SettingsAndMenuRouting],
  exports: [SettingsAndMenuComponent],
  providers: [SettingsFormServiceService],
})
export class SettingsAndMenuModule {}
