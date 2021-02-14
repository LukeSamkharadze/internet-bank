import { NgModule } from '@angular/core';
import { SettingsAndMenuComponent } from './settings-and-menu.component';
import { FeaturesSharedModule } from '../shared/features-shared.module';
import { SettingsAndMenuRouting } from './settings-and-menu-routing.module';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [SettingsAndMenuComponent, SettingsComponent],
  imports: [FeaturesSharedModule, SettingsAndMenuRouting],
  exports: [SettingsAndMenuComponent],
})
export class SettingsAndMenuModule {}
